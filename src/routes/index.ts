import { Router } from "express";
import { v4 as uuid } from "uuid"

const router = Router();

interface UsersDTO {
  name: string;
  email: string;
  isActive: boolean;
  phone: string;
  revenue: number;
  agreedTerms: boolean;
  id: string;
}

const users: UsersDTO [] = []

router.get("/users", (request, response) => {
  return response.json({ users });
});

router.get("/users/:id", (request, response) => {
  const { id } = request.params;
  const user = users.find((user) => user.id === id);
  return response.json(user)
})

router.post("/users", (request, response, next) => {
  const { name, email, isActive, phone, revenue, agreedTerms } = request.body

  const userAlreadyExists = users.find(
    (user) => user.name === name
  );

  if(userAlreadyExists) {
    return response.status(400).json({ message: "User already exists" });
  }

  const user = {
    name,
    email,
    isActive,
    phone,
    revenue,
    agreedTerms,
    id: uuid()
  };

  users.push(user);

  return response.json(user)
});

router.put("/users/:id", (request, response) => {
  const { id } = request.params;
  const { name, email, isActive, phone, revenue, agreedTerms } = request.body;

  const userIndex = users.findIndex((user) => user.id === id);

  if(userIndex === -1) {
    return response.status(400).json({ message: "User does not exists" });
  }

  const user: UsersDTO = Object.assign({
    name,
    email,
    isActive,
    phone,
    revenue,
    agreedTerms
  });

  users[userIndex] = user

  return response.json(user)

});
router.delete("/users/:id", (request, response) => {
  const { id } = request.params;
  const { name, email, isActive, phone, revenue, agreedTerms } = request.body;

  const userIndex = users.findIndex((user) => user.id === id);

  if(userIndex === -1) {
    return response.status(400).json({ message: "User does not exists" });
  }

  const user: UsersDTO = Object.assign({
    name,
    email,
    isActive,
    phone,
    revenue,
    agreedTerms
  });

  users[userIndex] = user

  return response.json(user)
});



export default router;