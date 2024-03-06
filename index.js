//Importar fs
const fs = require('fs')

//Creacion de la clase de productos
class ProductManager {
    constructor() {
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
            return []
        }
    }

    //Metodo para agregar productos
    async addProduct(product) {

        // Validar campos vacios
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.error('Faltan datos, todos los campos deben estar completos')
            return
        }
        try {
            if (!this.products.some(p => p.code === product.code)) {
                const newProduct = { id: this.id++, ...product }
                this.products.push(newProduct)

                await fs.promises.writeFile(this.path, JSON.stringify(this.products), 'utf-8')
                console.log(`Producto * ${product.title} * agregado correctamente`)
            } else {
                console.log(`Ya existe un producto con el codigo ${product.code}`);
            }
        }
        catch (err) {
            console.error('Error, el archivo no se pudo escribir')
            return
        }
    }

    // Metodo para obtener/consultar productos
    async getProducts() {
        try {
            const allProducts = await this.readDataFromFile()
            return allProducts
        }
        catch (err) {
            console.error('Error, el archivo no se pudo leer')
            return
        }
    }

    // Metodo para obtener productos por ID
    async getProductsId(id) {
        try {
            const allProducts = await this.readDataFromFile()
            const product = allProducts.find(p => p.id === id)
            return product
        }
        catch (err) {
            console.error('No se encontró el producto que buscabas')
            return
        }
    }

    // Metodo para eliminar un producto
    async deleteProduct(id) {
        try {
            const allProducts = await this.readDataFromFile()
            const index = allProducts.findIndex(p => p.id === id)
            if (index !== -1) {
                //const deleteProduct = allProducts.splice(index, 1)
                allProducts.splice(index, 1)
                await fs.promises.writeFile(this.path, JSON.stringify(allProducts), 'utf-8')
                console.log(`Producto con ID ${id} eliminado correctamente`)
            } else {
                console.log(`No se encontró un producto con el ID ${id}`)
            }
        } catch (err) {
            console.error('Error al eliminar producto', err)
        }
    }
    // Metodo para actualizar un producto
    async updateProduct(product) {
        try {
            const allProducts = await this.readDataFromFile()
            const index = allProducts.findIndex(p => p.id === product.id)
            if (index !== -1) {
                allProducts.splice(index, 1, product)
                await fs.promises.writeFile(this.path, JSON.stringify(allProducts), 'utf-8')
                console.log(`Producto con ID ${product.id} actualizado correctamente`)
            } else {
                console.log(`No se encontró un producto con el ID ${product.id}`)
            }
        } catch (err) {
            console.error('Error al actualizar producto', err)
            return
        }
    }
    
}


// Se instancia la clase
const bd = new ProductManager()


// Funcion para cargar productos
async function loadProducts() {
    await bd.addProduct({
        title: 'Manzana',
        description: 'Manzana roja grande',
        price: 1500,
        thumbnail: '../archivo1.jpg',
        code: codeGenerator(),
        stock: 50
    })
    await bd.addProduct({
        title: 'Pera',
        description: 'Pera de Israel',
        price: 1200,
        thumbnail: '../archivo2.jpg',
        code: codeGenerator(),
        stock: 38
    })
    await bd.addProduct({
        title: 'Uva',
        description: 'Uva blanca',
        price: 1800,
        thumbnail: '../archivo3.jpg',
        code: codeGenerator(),
        stock: 457
    })
    await bd.addProduct({
        title: 'Melon',
        description: 'Melon amarillo',
        price: 1530,
        thumbnail: '../archivo4.jpg',
        code: codeGenerator(),
        stock: 11
    })
}

function codeGenerator() {
    let code = Math.random().toString(36).substring(3, 9)
    return code
}



// Programa principal
const main = async () => {
    // Mostrar marca de inicio para ayudar a la visualización dentro de la terminal
    console.log('\n================================================================')
    console.log('>>>>>                  INICIA EL PROGRAMA                  <<<<<')
    console.log('================================================================\n')

    // Mostrar array vacio
    const products = await bd.getProducts()
    console.log(products)

    // Agregar productos
    await loadProducts()

    // Mostrar todos los producto (array completo)
    const products2 = await bd.getProducts()
    console.log('-----Listado completo de productos-----\n', products2)

    // Mostrar un producto buscado por id
    const product = await bd.getProductsId(2)
    console.log('-----Producto buscado por ID-----\n', product)

    // Actualizar un producto (cambiar stock y descripción)
    console.log('\n-----Producto actualizado-----')
    await bd.updateProduct({
        id: 2,
        title: 'Pera',
        description: 'Pera de oferta',
        price: 1200,
        thumbnail: '../archivo2.jpg',
        code: codeGenerator(),
        stock: 100000
        })

    // Eliminar un producto por id
    console.log('\n-----Producto eliminado por ID-----')
    const deletedProduct = await bd.deleteProduct(3)
}

main()
