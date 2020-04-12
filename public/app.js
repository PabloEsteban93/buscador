const ciudad = $('#ciudad'),
      tipo = $('#tipo'),
      rangoPrecio = $('#rangoPrecio'),
      busqueda = $('#checkPersonalizada'),
      list = $('#lista'),
      template = ' <div class="card horizontal">\n' +
    '          <div class="card-image"><img src="img/home.jpg"></div>\n' +
    '          <div class="card-stacked">\n' +
    '            <div class="card-content">\n' +
    '              <div><p><b>Direccion: </b>{{address}}</p></div>\n' +
    '              <div><p><b>Ciudad: </b>{{city}}</p></div>\n' +
    '              <div><p><b>Telefono: </b>{{phone}}</p></div>\n' +
    '              <div><p><b>Código postal: </b>{{code}}</p></div>\n' +
    '              <div><p><b>Precio: </b>{{price}}</p></div>\n' +
    '              <div><p><b>Tipo: </b>{{type}}</p></div>\n' +
    '            </div>\n' +
    '          </div>\n' +
    '        </div>',
    option = '<option value="{{value}}">{{label}}</option>';


//Inicializador del elemento Slider
rangoPrecio.ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 1000,
    to: 20000,
    prefix: "$"
});

function setSearch() {
    this.customSearch = true;
    busqueda.on('change', (e) => {
        if (this.customSearch === false) {
            this.customSearch = true;
        } else {
            this.customSearch = false;
        }
        $('#personalizada').toggleClass('invisible')
    })
}

setSearch();
init();

function init() {
    getCities();
    getTypes();
    let buscar = $('#buscar');
    buscar.on('click', (e) => {
        search();
    });
}

async function getCities() {
    try {
        let response = await axios.get('/properties/cities');
        console.log('response', response);
        //TODO: put data in select and visible it
        

    } catch (e) {
        console.log(e);
    }
}


async function getTypes() {
    try {
        let response = await axios.get('/properties/types');
        console.log('response', response);
        //TODO: put data in select and visible it

    } catch (e) {
        console.log(e);
    }
}


async function search() {
    try {
        list.empty();
        let ciudadValue = ciudad.val();
        let tipoValue = tipo.val();
        let rangoPrecioValue = rangoPrecio.val();

        console.log('ciudad', ciudadValue);
        console.log('tipo', tipoValue);
        console.log('rangoPrecio', rangoPrecioValue);
        let data = {
            city: ciudadValue,
            type: tipoValue,
            range: rangoPrecioValue,
            all: this.customSearch
        };
        let response = await axios.post('/properties', data);
        console.log('response', response);
        //TODO: put data in list html
        let html = generateList(response.data);
        console.log(html);
        list.append(html);

    } catch (e) {
        console.log(e);
    }
}

function generateList(json) {
    if(json.length === 0) return '<p>No hay resultados</p>'

    return json.map((item) => {
        return Mustache.render(template,
            {
                address: item.Direccion,
                city: item.Ciudad,
                phone: item.Telefono,
                code: item.Codigo_Postal,
                type: item.Tipo,
                price: item.Precio
            });
    });
}
function generateOptions(json) {

    return json.map((item) => {
        return Mustache.render(option,
            {
                value: item,
                label: item
            });
    });
}

