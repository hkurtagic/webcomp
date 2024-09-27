import model from "../models/model.js";

class Controller {

    getAll(req, res) {
        console.log('getall')
        const data = model.getAll();
        res.send(model.getAll());
        console.log(model.getAll())
    }

    get(req, res) {
        console.log('get')
        const resource = model.get(+req.params.id);
        if (resource) {
            res.send(resource);
        } else {
            res.status(404).send(`Resource with id ${req.params.id} not found.`);
        }
    }

    create = (req, res) => {
        /* Creates a new resources (the model assign an id) and sends it back to the client.
         * If something goes wrong, send back status code 404. 
         * Add the moment, no validation on the incoming data is made. This is always 
         * necessary in a real-world project.
         */
        console.log('create')
        const resource = req.body;
        try {
            res.send(model.create(resource));
        } catch (e) {
            res.status(404).send(`Error occured creating new resource: ${e}`);
        }
    }

    update = (req, res) => {
        /* Updates a resource. If successful, sends back status 200. */
        console.log('update')
        const id = +req.params.id;

        if (!model.get(id)) {
            res.status(404).send(`No resource with id ${id} exists. Update not possible.`);
        } else {
            const resource = req.body;
            console.log(req.body)
            model.update(id, resource);
            res.sendStatus(200);
        }
    }

    delete(req, res) {
        /* Deletes the given resource from the model.Checks the incoming id first
         * After deleting the resource, sends back status 204. */
        console.log('delete')
        const id = +req.params.id;

        if (!model.get(id)) {
            res.status(404).send(`No resource with id ${id} exists. Delete not possible.`);
        } else {
            model.delete(id);
            res.sendStatus(204);
        }
    }
}

export default new Controller()