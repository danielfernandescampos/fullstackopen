describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Daniel Fernandes Campos",
      username: "daniel_fernandes",
      password: "123",
    };
    const user2 = {
      name: "Vanessa Igawa",
      username: "vanessa_igawa",
      password: "123",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.request("POST", "http://localhost:3003/api/users", user2);
    cy.visit("http://localhost:3000");
  });

  it("should open front page", function () {
    cy.contains("blogs page");
  });

  it("should show login form", function () {
    cy.contains("Login");
    cy.get("#username");
    cy.get("#password");
  });

  describe("Login", function () {
    it("should login user with right credentials", function () {
      cy.get("#username").type("daniel_fernandes");
      cy.get("#password").type("123");
      cy.get("#login-button").click();
      cy.get("#logout-button").click();
    });

    it("should not login user with wrong credentials", function () {
      cy.get("#username").type("daniel_fernandes");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();
      cy.get(".message").contains("don't match");
      cy.get("html").should("not.contain", "Daniel Fernandes Campos logged in");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "daniel_fernandes", password: "123" });
    });

    it("should create a new blog", async function () {
      cy.contains("New blog").click();
      cy.get("#title").type("test title");
      cy.get("#author").type("test author");
      cy.get("#url").type("test url");
      cy.contains("Create").click();
      cy.contains("test title");
    });

    describe("and there are some blogs", function () {
      beforeEach(function () {
        cy.addBlog({
          title: "foucault and power",
          author: "michel",
          url: "www.com.br",
        });

        cy.addBlog({
          title: "daniel and power",
          author: "Daniel Fernandes",
          url: "www.com.br",
          likes: 99,
        });
        cy.visit("http://localhost:3000");
      });

      it("should be able to like a blog", async function () {
        cy.contains("foucault and power").find("button").click();
        cy.get("#like-button").click();
      });

      it("should be able to delete if is the author", async function () {
        cy.contains("foucault and power").find("button").click();
        cy.get("#delete-button").click();
      });

      it("should not delete if is not the author", async function () {
        cy.get("#logout-button").click();
        cy.login({ username: "vanessa_igawa", password: "123" });
        cy.contains("foucault and power").find("button").click();
        cy.get("#delete-button").should("not.exist");
      });

      it.only("should order by likes", function () {
        setTimeout(() => {
          cy.contains("sort by likes").click();
          cy.get(".blog").eq(0).should("contain", "daniel and power");
        }, 1000);
      });
    });
  });
});
