import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res)
  const {to, title, body} = req.body.data
  console.log(to,title,body)

        const { data, status } = await axios.post(
            "https://exp.host/--/api/v2/push/send",
            { 
                to,
                title,
                body
                },
            {
              headers: {
                "host": "exp.host",
                "accept": "application/json",
                "Accept-Encoding": "gzip, deflate",
                "Content-type": "application/json",
              },
            }
          );
        
        console.log(status)
        
        return res.json({data})
   
       


}