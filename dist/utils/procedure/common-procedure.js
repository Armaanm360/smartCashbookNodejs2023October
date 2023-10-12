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
Object.defineProperty(exports, "__esModule", { value: true });
exports.callSingleStatusParamWithLimitSkipStoredProcedure = exports.callSingleParamStoredProcedure = void 0;
const database_1 = require("../../app/database");
const callSingleParamStoredProcedure = (procedureName, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield database_1.db.raw(`CALL ${procedureName}(?)`, [id]);
        return result[0][0];
    }
    catch (error) {
        throw error;
    }
});
exports.callSingleParamStoredProcedure = callSingleParamStoredProcedure;
const callSingleStatusParamWithLimitSkipStoredProcedure = (procedureName, status, limit = 1000, skip = 0) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield database_1.db.raw(`CALL ${procedureName}(?,?,?)`, [
            status,
            limit,
            skip,
        ]);
        return result[0][0];
    }
    catch (error) {
        throw error;
    }
});
exports.callSingleStatusParamWithLimitSkipStoredProcedure = callSingleStatusParamWithLimitSkipStoredProcedure;
