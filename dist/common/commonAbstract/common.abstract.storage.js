"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allowed_file_types = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];
class CommonAbstractStorage {
    constructor() {
        this.allowed_file_types = allowed_file_types;
        this.error_message = 'Only .jpg, .jpeg, .webp or .png format allowed!';
    }
}
exports.default = CommonAbstractStorage;
