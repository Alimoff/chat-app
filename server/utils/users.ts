export class Users {
    users:[];

    constructor(){
        this.users = [];
    }

    public async addUser(id, name, room){
        let user = {id,name,room};
        this.users.push(user);
        return user;
    }

    public async getUserList(room){
        let users = this.users.filter((user) => user.room === room);
        let namesArray = users.map((user)=> user.name);
        return namesArray        
    }

    public async getUser(id){
        return this.users.filter((user)=>user.id == id)[0];
    }

    public async removeUser(id){
        let user = this.getUser(id);

        if(await user){
            this.users = this.users.filter((user)=> user.id !== id);
        }
        return user;
    }
}


module.exports = {Users};