import supertest from "supertest"
import { ContactTest, UserTest } from "./test-utils"
import { buki } from "../src/application/buki"
import { logger } from "../src/application/logging"

describe ('POST /api/contacts', () => {
    beforeEach (async () => {
        await UserTest.create()
    })

    afterEach (async () => {
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