"use strict";
exports.__esModule = true;
var PaginateCustomLabels = /** @class */ (function () {
    function PaginateCustomLabels(nameLabel) {
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
    return PaginateCustomLabels;
}());
exports["default"] = PaginateCustomLabels;
