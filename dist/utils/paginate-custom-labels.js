"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PaginateCustomLabels {
    constructor(nameLabel) {
        this.docs = nameLabel;
        this.totalDocs = 'total';
        this.limit = 'limit';
        this.page = 'offset';
        this.totalPages = 'offsets';
        this.pagingCounter = false;
        this.hasPrevPage = false;
        this.hasNextPage = false;
        this.prevPage = false;
        this.nextPage = false;
    }
}
exports.default = PaginateCustomLabels;
