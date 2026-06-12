import { PropertyRepository } from "./repositories/property.repository.js";
import { PropertyService } from "./services/property.service.js";
import { PropertyController } from "./controllers/property.controller.js";


const propertyRepository = new PropertyRepository();
const propertyService = new PropertyService(propertyRepository);
const propertyController = new PropertyController(propertyService);

export { propertyController };