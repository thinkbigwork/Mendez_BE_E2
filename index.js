//Importar fs
const fs = require('fs')

//Creacion de la clase de productos
class ProductManager{
    constructor (){
        this.products = []
        this.path = './file.json'
        this.id = 1
    }
    
    // Funcion para leer archivo
    async readDataFromFile() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            if (!data.trim()) {
                console.warn(`Warning: El archivo ${this.path} está vacío\n`)
                return []
            }
            return JSON.parse(data)
        } catch (err) {
            console.error(`Error: no se encontró el archivo ${this.path}`)
            throw err;
        }
    }

    //Metodo para agregar productos
    async addProduct(product) {

        // Validar campos vacios
        if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock){
            console.error('Faltan datos, todos los campos deben estar completos')
            return 
        }
        try {
            if (!this.products.some(p => p.code === product.code)){
                const newProduct = {id: this.id++, ...product}
                this.products.push(newProduct)

                await fs.promises.writeFile(this.path, JSON.stringify(this.products), 'utf-8')
                console.log(`Producto * ${product.title} * agregado correctamente`)
            } else {
                console.log(`Ya existe un producto con el codigo ${product.code}`);
              }
        }
        catch (err){
            console.error('Error, el archivo no se pudo escribir')
            throw err
        }
    }

    // Metodo para obtener/consultar productos
    async getProducts() {
        try {
            const allProducts = await this.readDataFromFile()
            return allProducts
        }
        catch (err){
            console.error('Error, el archivo no se pudo leer')
            throw err
        }
    }

    // Metodo para obtener productos por ID
    async getProductsId(id) {
        try {
            const allProducts = await this.readDataFromFile()
            const product = allProducts.find(p => p.id === id)
            return product
        }
        catch (err){
            console.error('No se encontró el producto que buscabas')
            throw err
        }
    }

    // Metodo para eliminar un producto
    async deleteProduct(id) {
        try {
            const allProducts = await this.readDataFromFile()
            const index = allProducts.findIndex(p => p.id === id)
            if (index !== -1) {
                const deleteProduct = allProducts.splice(index, 1)
                await fs.promises.writeFile(this.path, JSON.stringify(allProducts), 'utf-8')
                console.log(`Producto con ID ${id} eliminado correctamente`)
                return deleteProduct
            } else {
                console.log(`No se encontró un producto con el ID ${id}`)
            }
        } catch (err) {
            console.error('Error al eliminar producto', err)
            throw err;
        }
    }
}


// Se instancia la clase
const bd = new ProductManager()


// Se llama a la funcion para cargar productos
loadProducts()


// Mostrar todos los producto (array completo)
bd.getProducts().then((products) => {
    console.log('-----Listado completo de productos-----\n', products)
})

// Mostrar un producto buscado por id
bd.getProductsId(2).then((product) => {
console.log('-----Producto buscado por ID-----\n', product);
})

// Eliminar un producto por id
bd.deleteProduct(3).then((product) => {
console.log('-----Producto eliminado por ID-----\n', product);
})


// Funcion para cargar productos
async function loadProducts() {
bd.addProduct({
    title: 'Manzana',
    description: 'Manzana roja grande',
    price: 1500,
    thumbnail: '../archivo1.jpg',
    code: codeGenerator(),
    stock: 50
})
bd.addProduct({
    title: 'Pera',
    description: 'Pera de Israel',
    price: 1200,
    thumbnail: '../archivo2.jpg',
    code: codeGenerator(),
    stock: 38
})
bd.addProduct({
    title: 'Uva',
    description: 'Uva blanca',
    price: 1800,
    thumbnail: '../archivo3.jpg',
    code: codeGenerator(),
    stock: 457
})
bd.addProduct({
    title: 'Melon',
    description: 'Melon amarillo',
    price: 1530,
    thumbnail: '../archivo4.jpg',
    code: codeGenerator(),
    stock: 11
})
}

function codeGenerator (){
let code = Math.random().toString(36).substring(3, 9)
return code
}
