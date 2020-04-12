const express = require('express')
const Storage = require('../storage')
const Router = express.Router()


Router.post('/', async (req, res) => {
    try {
        //params from post
        let params = req.body;
        //range params
        let range = params.range.split(';');
        let min = range[0];
        let max = range[1];
        console.log('params', params);
        console.log('range', range);
        // get properties from storage
        let properties = await Storage.getData('properties');

        if(params.all){
            //return all properties
            console.log('properties', properties.length);
            res.json(properties);
        }else{
            // fliter properties by range price
            let filtered = properties.filter((property)=>{
                let val = parseInt(property.Precio.substr(1).replace(',', ''));
                return val>min && val<max;
            });
            //filter by city if selected
            if(params.city !== ''){
                filtered = filtered.filter((property)=>{
                    return property.Ciudad === params.city;
                });
            }
            //filter by type if selected
            if(params.type !== ''){
                filtered = filtered.filter((property)=>{
                    return property.Tipo === params.type;
                });
            }
            res.json(filtered);
        }


    } catch (e) {
        console.log(e);
        res.sendStatus(500).json(e);

    }
});


Router.get('/cities', async (req, res) => {
    try {
        // get properties from storage
        let properties = await Storage.getData('properties');
        let cities = properties.map((property)=>{
            return property.Ciudad
        });
        let uniqueCities = [...new Set(cities)];
        console.log('cities', cities);
        console.log('cities', uniqueCities);
        res.json(uniqueCities);
    } catch (e) {
        console.log(e);
        res.sendStatus(500).json(e);

    }
});

Router.get('/types', async (req, res) => {
    try {
        // get properties from storage
        let properties = await Storage.getData('properties');
        let types = properties.map((property)=>{
            return property.Tipo
        });
        let uniqueTypes = [...new Set(types)];
        console.log('types', types);
        console.log('uniqueTypes', uniqueTypes);
        res.json(uniqueTypes);
    } catch (e) {
        console.log(e);
        res.sendStatus(500).json(e);

    }
});

module.exports = Router