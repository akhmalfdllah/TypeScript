import { Contact } from "@prisma/client";
import { Response, NextFunction, request } from "express";
import { CreateAddressRequest } from "../model/address-model";
import { UserRequest } from "../type/user-request";
import { AddressService } from "../service/address-service";
import { logger } from "../application/logging";

export class AddressController {
    static async create(req: UserRequest, res: Response, next: NextFunction){
        try {
            const request: CreateAddressRequest = req.body as CreateAddressRequest
            request.contact_id = Number(req.params.contactId)

            const response = await AddressService.create(req.user!, request);
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e);
        } 
    }
} 