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
        self.client.get("/api_blog/blog/0bc8332e-a7ec-4a3d-a35d-9e5311b69958")
