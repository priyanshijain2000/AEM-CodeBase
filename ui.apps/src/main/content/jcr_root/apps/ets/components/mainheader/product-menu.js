"use strict";
use(function () {
    var brand= this.brand + "-";
    var tempName = currentPage.getTemplate().getName();
    return tempName.includes(brand)?"active":"";
});