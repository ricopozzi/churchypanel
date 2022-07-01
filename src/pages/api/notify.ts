import Cors from 'cors'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {to, title, body} = req.body.data

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
        
        
        return res.json({data})
   
       


}