class LocalStorage {
    constructor(){
        this.keyLocalStorage = "user";
    }
    createStorage(formData){
        let objStorage = JSON.stringify(formData),
            key = formData.username;
        localStorage.setItem(this.keyLocalStorage, objStorage);
    }
    getStorage(){
        return localStorage.getItem(this.keyLocalStorage);
    }
}
export default LocalStorage