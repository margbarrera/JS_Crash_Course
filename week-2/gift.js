module.exports = class Gift {
    constructor(name, price, url) {
        this.name = name;
        this.price = price;
        this.url = url;
        this.giftedToArchive = [];
        this.tags = [];
    }

    assignTag(tag) {
        this.tags.push(tag)
    }
}