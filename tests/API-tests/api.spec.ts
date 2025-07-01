import { expect, test } from "@playwright/test";
import {z} from 'zod/v4';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });
import fs from "fs";


test('[POST] login user', async ({request})=>
{
  // / --> alone is understood as base url
  const response =
    await request.post('/users/login', 
      {
        data:
        {
          "email": "cyril_test@test.com",
          "password": "password123"
      }
      }
    );
    await expect(response).toBeOK();  //check whether response received as 200 OK
    expect.soft(response.status()).toBe(200)
    const responseBody = await response.json();
    console.log(responseBody.token);
    const envPath = path.resolve(__dirname, '../.env')
    //.env
    fs.writeFileSync(envPath, `TOKEN=${responseBody.token}`)

    const schema = z.object({
      user: z.object(
        {
          _id: z.number(),
          firstname: z.string(),
          lastName: z.string(),
           email: z.number(),
           __v: z.number(),
        }
      ),
      token: z.number(),
    });

    expect(async ()=>{
      await schema.parseAsync(responseBody)
    })

});


test('get user profile', async ({request})=>{
  // const envPath = path.resolve(__dirname, "../.env");
  // fs.readFileSync(envPath);
  const response =
  await request.get('/users/me',
    {
      headers:
      {
        Authorization: `Bearer ${process.env.TOKEN}`
      }
    }
  )

  console.log(await response.json())
  //https://thinking-tester-contact-list.herokuapp.com/users/me
});