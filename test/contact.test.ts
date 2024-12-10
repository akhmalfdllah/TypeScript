import supertest from "supertest"
import { ContactTest, UserTest } from "./test-utils"
import { buki } from "../src/application/buki"
import { logger } from "../src/application/logging"

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
        const response =  await supertest(buki)

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

    it('should be able to update contact', async () => {
        
    })
})