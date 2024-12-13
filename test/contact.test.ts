import supertest from "supertest"
import { ContactTest, UserTest } from "./test-utils"
import { buki } from "../src/application/buki"
import { logger } from "../src/application/logging"
import { prismaClient } from "../src/application/database"

describe('POST /api/contacts', () => {
    beforeEach(async () => {
        await UserTest.create()
    })

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    })

    it('should create new contact', async () => {
        const response = await supertest(buki)
            .post("/api/contacts")
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "Akhmal",
                last_name: "Faidillah",
                email: "akhmal@example.com",
                phone: "0866666666"
            })

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.first_name).toBe("Akhmal");
        expect(response.body.data.last_name).toBe("Faidillah");
        expect(response.body.data.email).toBe("akhmal@example.com");
        expect(response.body.data.phone).toBe("0866666666");
    })

    it('should reject create new contact if data is invalid', async () => {
        const response = await supertest(buki)
            .post("/api/contacts")
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "",
                last_name: "",
                email: "akhmalexamplecom",
                phone: "0866666666dddddddddd"
            })

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })
})

describe('GET /api/contacts/:contactId', () => {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    })

    it('should be able get contact', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(buki)
            .get(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test")
        //  logger.debug("parah nih: " + JSON.stringify(contact));

        logger.debug(response.body);
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.first_name).toBe(contact.first_name);
        expect(response.body.data.last_name).toBe(contact.last_name);
        expect(response.body.data.email).toBe(contact.email);
        expect(response.body.data.phone).toBe(contact.phone);

    })
    it('should reject get contact if contact is not found', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(buki)
            .get(`/api/contacts/${contact.id + 1}`)
            .set("X-API-TOKEN", "test")

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })

})

describe('PUT /api/contacts/:contactId', () => {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    })

    it('should be able to update contact', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(buki)

            .put(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "Akhmal",
                last_name: "Faidillah",
                email: "Akhmal@example.com",
                phone: "777777"
            })
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(contact.id);
        expect(response.body.data.first_name).toBe("Akhmal");
        expect(response.body.data.last_name).toBe("Faidillah");
        expect(response.body.data.email).toBe("Akhmal@example.com"); 
        expect(response.body.data.phone).toBe("777777");

    })

    it('should reject update contact if request is invalid', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(buki)

            .put(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "",
                last_name: "F",
                email: "Akhmal@exam",
                phone: ""
            })
        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();

    })
})

describe('DELETE /api/contacts/:contactId', () => {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    })

    it('should be able to remove contact', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(buki)
            .delete(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("OK");
    })
    it('should reject remove contact if contact is not found', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(buki)
            .delete(`/api/contacts/${contact.id + 1}`)
            .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })
})

describe('GET /api/contacts', () => {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    })

    it('should be able to search contact', async () => {
        const response = await supertest(buki)
            .get("/api/contacts")
            .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    })

    it('should be able to search contact using name', async () => {
        const response = await supertest(buki)
            .get("/api/contacts")
            .query ({
                name: "es"
            })
            .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    })

    it('should be able to search contact using email', async () => {
        const response = await supertest(buki)
            .get("/api/contacts")
            .query ({
                email: ".com"
            })
            .set("X-API-TOKEN", "test")

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    })

    it('should be able to search contact using phone', async () => {
        const response = await supertest(buki)
            .get("/api/contacts")
            .query({
                phone:"66666"
            })
            .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    })

    it('should be able to search contact no result', async () => {
        const response = await supertest(buki)
            .get("/api/contacts")
            .query ({
                name: "aku-kaya"
            })
            .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(0);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(0);
        expect(response.body.paging.size).toBe(10);
    })

    it('should be able to search contact with paging', async () => {
        const response = await supertest(buki)
            .get("/api/contacts")
            .query ({
                page: 2,
                size: 1
            })
            .set("X-API-TOKEN", "test"); 

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(0);
        expect(response.body.paging.current_page).toBe(2);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(1);
    })
})
