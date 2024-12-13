import supertest from "supertest";
import { AddressTest, ContactTest, UserTest } from "./test-utils";
import { buki } from "../src/application/buki";
import { logger } from "../src/application/logging";

describe('POST /api/contacts/:contactId/addresses', () => {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create();
    })

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    })

    it('should be able to create address', async () => {
        const contact = await ContactTest.get();
        logger.debug("ini nih: ", JSON.stringify(contact))
        const response = await supertest(buki)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "jalan-jalan",
                city: "Grobogan",
                province: "London",
                country: "Indonesia",
                postal_code: "12345"
            })

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.street).toBe("jalan-jalan");
        expect(response.body.data.city).toBe("Grobogan");
        expect(response.body.data.province).toBe("London");
        expect(response.body.data.country).toBe("Indonesia");
        expect(response.body.data.postal_code).toBe("12345");
    })

    it('should be able to create address', async () => {
        const contact = await ContactTest.get();
        logger.debug("ini nih: ", JSON.stringify(contact))
        const response = await supertest(buki)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "jalan-jalan",
                city: "Grobogan",
                province: "London",
                country: "",
                postal_code: ""
            })

        logger.debug(response.body);
        expect(response.status).toBe(400);
    })
}) 