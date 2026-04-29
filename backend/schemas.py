from pydantic import BaseModel

class User(BaseModel):
    first_name: str
    last_name: str
    register_number: str
    mobile: str
    email: str


class Teacher(BaseModel):
    first_name: str
    last_name: str
    staff_id: str
    mobile: str
    email: str
    subject: str