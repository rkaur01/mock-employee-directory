var schema = {
  "type": "object",
  "properties": {
    "employees": {
      "type": "array",
      "minItems": 30,
      "maxItems": 30,
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "unique": true,
            "minimum": 1
          },
          "firstName": {
            "type": "string",
            "faker": "name.firstName"
          },
          "lastName": {
            "type": "string",
            "faker": "name.lastName"
          },
          "email": {
            "type": "string",
            "faker": "internet.email"
          },
          "picture": {
            type: "string",
            "faker": "image.avatar"
          }
        },
        "required": ["id", "type", "firstName", "lastName", "email"]
      }
    }
  },
  "required": ["employees"]
};

module.exports = schema;