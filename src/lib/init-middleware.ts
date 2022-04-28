// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware]
import { NextMiddleware } from "next/server"
//@ts-ignore
export default function initMiddleware(middleware) {
    //@ts-ignore

    return (req, res) =>
      new Promise((resolve, reject) => {
          //@ts-ignore

        middleware(req, res, (result) => {
          if (result instanceof Error) {
            return reject(result)
          }
          return resolve(result)
        })
      })
  }