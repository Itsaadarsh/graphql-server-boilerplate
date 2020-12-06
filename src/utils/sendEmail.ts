import SparkPost = require("sparkpost");

const client = new SparkPost(process.env.SPARK_API)

export const sendEmail = async (recipients:string,url:string) => {
    const res = await client.transmissions.send({
        options: {
          sandbox: true
        },
        content: {
          from: 'testing@sparkpostbox.com',
          subject: 'Hello, World!',
          html:`<html>
            <body>
            <p>Testing SparkPost - the world\'s most awesomest email service!</p>
            <a href=${url}>Confirm email!</a>
            </body>
            </html>`
        },
        recipients: [
          {address: recipients}
        ]
      })
      console.log(res  );
      
} 