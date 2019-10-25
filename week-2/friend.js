module.exports = class Friend {
    constructor(name, birthday) {
        this.name = name;
        this.birthday = birthday;
        this.pastGifts = [];
        this.tags = [];
        this.upcomingGifts = [];
    }

    assignTag(tag) {
        this.tags.push(tag)
    }

}