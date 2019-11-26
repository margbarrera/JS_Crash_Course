

module.exports = class Service {
  constructor(model) {
    this.model = model
  }
  async findAll() {
    return this.model.find()
  }

  async query(queryObj) {
    return this.model.find(queryObj)
  }

  async addToProperty(object, property, value) {
    //object[property].push(value)
    object[property] = value
    await object.save()
}

  async add(item) {
    return this.model.create(item)
  }

  async  del(itemId) {
    return this.model.remove({ _id: itemId })
  }

  async find(itemId) {
    return this.model.findById(itemId)
  }
}
