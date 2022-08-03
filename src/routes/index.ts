import { Router, Request, Response} from "express";
import functions from "../../database/functions";

const router = Router();

interface User {
  name: string;
  email: string;
  isActive: boolean;
  phone: string;
  revenue: number;
  agreedTerms: boolean;
}

interface Opportunity {
  name: string;
  limit: number;
  interest: number;
  term: number;
  isActive: boolean;
}

interface NewOpportunity {
  email: string;
  opportunities: Opportunity[]
}


router.get("/users",  async (request: Request, response: Response) => {
  const result = await functions.getAll("users")
  return response.json(result)
}); 


router.get("/users/:email", async (request: Request, response: Response) => {
  const { email } = request.params;

  if(!email) return response.status(400).json({message: "Email is required!"})

  const result = await functions.getOne("users", email)
  return response.json(result)
})

router.post("/users", async (request: Request, response: Response) => {
  const user: User = request.body

  const userAlreadyExists = await functions.getOne("users", user.email)

  if(userAlreadyExists) {
    return response.status(400).json({ message: "User already exists!" });
  }

  const result = await functions.set("users", user.email, user)

  return response.status(201).json(result)
});

router.put("/users/:email", async(request: Request, response: Response) => {
  const { email } = request.params;
  const user: User = request.body

  if(!email) return response.status(400).json({message: "Email is required!"})

  const result = await functions.update("users", email, user)

  return response.status(201).json(result)

});

router.delete("/users/:email", async (request: Request, response: Response) => {
  const { email } = request.params;

  if(!email) return response.status(400).json({message: "Email is required!"})

  const result = await functions.delete("users", email)

  return response.status(201).json(result)
});

router.get("/opportunities",  async (request: Request, response: Response) => {
  const result = await functions.getAll("opportunities")
  return response.json(result)
}); 

router.get("/opportunities/:email", async (request: Request, response: Response) => {
  const { email } = request.params;

  if(!email) return response.status(400).json({message: "Email is required!"})

  const result = await functions.getOne("opportunities", email)
  return response.json(result)
})

router.post("/opportunities", async (request: Request, response: Response) => {
  const opportunity: NewOpportunity = request.body
  const email = opportunity.email

  delete opportunity.email

  const userExists = await functions.getOne("users", email)

  if(!userExists) {
    return response.status(400).json({ message: "User not exists" });
  }
  
  const result = await functions.set("opportunities", email, opportunity)

  return response.status(201).json(result)
});

router.put("/opportunities/:email", async (request: Request, response: Response) => {
  const opportunities: NewOpportunity = request.body 
  const { email } = request.params;

  const result = await functions.update("opportunities",  email, {opportunities})

  return response.status(201).json(result)

});

router.delete("/opportunities/:email", async (request: Request, response: Response) => {
  const { email } = request.params;

  if(!email) return response.status(400).json({message: "Email is required!"})

  const result = await functions.delete("opportunities", email)

  return response.status(201).json(result)
});

export default router;