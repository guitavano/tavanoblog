
export default async function handler(req, res){
    const {email} = req.query

    //Enviar para planilha

    let data = {
        "properties" :{
            "company": "",
            "email": email,
            "firstname": "",
            "lastname": "",
            "phone": "",
            "website": ""
        }
    }

    let options = {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${process.env.HUBSPOT_TOKEN}`
        },
        body: JSON.stringify(data),
      }

    let response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', options)

    let message = response.statusText

    console.log(message)

    if(message == "Conflict"){
        //Já cadastrado
        return res.status(409).json({ message: 'Seu e-mail já está registrado!' })
    }

    if(message == "Bad Request"){
        return res.status(400).json({ message: 'E-mail inválido' })
    }

    if(message == "Created"){
        return res.status(200).json({ message: 'Registrado com sucesso!' })
    }


}