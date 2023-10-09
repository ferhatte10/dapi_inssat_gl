from locust import HttpUser, task

class HelloWorldUser(HttpUser):

    @task
    def home_gateway(self):
        self.client.get("/")

    @task
    def home_api_1(self):
        self.client.get("/api_blog")
    
    @task

    def getBlogs(self):
        self.client.get("/api_blog/blog")

    @task
    def getBlog(self):
        self.client.get("/api_blog/blog/0250bf9d-5af6-4472-846d-b0a138e63440")
