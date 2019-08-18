import React from 'react';

const LoginPage = () => {
    return (
        <div className="loginpage">
            <form>
                <input type="email" name="email" required placeholder="Enter your Email"></input>
                <input type="password" name="password" required placeholder="Enter your Password"></input>
            </form>
        </div>
    );
}

export default LoginPage;