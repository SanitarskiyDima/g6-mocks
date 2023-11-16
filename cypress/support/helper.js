export function loginViaAPI(user){

    let requestBody = {user: {email: "", password: ""}}

    requestBody.user.email = user.email;
    requestBody.user.password = user.password;

    cy.request({
        url: '/api/users/login',
        method: 'POST',
        body: requestBody
    }).then( response => {
        let token = response.body.user.token;
        let sessionData = response.body.user;

        sessionData.effectiveImage = "https://static.productionready.io/images/smiley-cyrus.jpg";

        cy.setCookie("auth", token);
        window.localStorage.setItem("user", JSON.stringify(sessionData));
    })
}