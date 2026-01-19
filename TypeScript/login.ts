class Login {

    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    validateLogin(): void {
        if (this.username === "admin" && this.password === "1234") {
            console.log("Login Successful");
        } else {
            console.log("Invalid Username or Password");
        }
    }
}


const user1 = new Login("admin", "1234");
user1.validateLogin();

const user2 = new Login("mahesh", "1111");
user2.validateLogin();
