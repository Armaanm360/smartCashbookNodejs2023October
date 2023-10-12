"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_service_1 = __importDefault(require("../../abstract/abstract.service"));
class TransService extends abstract_service_1.default {
    createServiceTrans(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const userid = payload[0].user_id;
            const requestdata = payload;
            const dbdata = yield this.db('transactions').where('user_id', userid);
            console.log(dbdata.length);
            const objA = dbdata;
            const objB = requestdata;
            if (!dbdata.length) {
                yield this.db('transactions').insert(objB);
                return {
                    success: true,
                    code: 201,
                    message: 'Data Inserted Successfully',
                    data: dbdata,
                };
            }
            else {
                const difference = [];
                for (const itemB of objB) {
                    const itemA = objA.find((item) => item.from_app_id === itemB.from_app_id);
                    if (!itemA) {
                        difference.push(itemB);
                    }
                }
                const objectC = {
                    difference,
                };
                if (difference.length === 0) {
                    return {
                        success: true,
                        code: 201,
                        message: 'Data Already Exported',
                        // data: requestdata,
                    };
                }
                else {
                    const newinserted = yield this.db('transactions').insert(difference);
                    return {
                        success: true,
                        code: 201,
                        message: 'Data Exported Successfully',
                        data: newinserted,
                    };
                }
            }
        });
    }
    listServiceTrans(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.db('transactions').where('user_id', userid);
            return {
                success: true,
                code: 201,
                message: 'Data Fetched Successfully',
                data: { data },
            };
        });
    }
}
exports.default = TransService;
