const db = require('../db')

exports.dataList = async (req, res) => {
  const data = await db.getData()
  //console.log(data)
  const context = {
    layout: 'main',
    name: data.name,
    surname: data.surname,
    qualification: data.qualification,
    github: data.github,
    about: data.about,
    location: data.location,
    website: data.website,
    email: data.email,
    skills: data.skills.map(el=>({
      skill_name: el.skill_name,
      level: el.level,
      progress : el.progress

    })),
    experience: data.experience.map(el => ({
      title: el.title,
      place: el.place,
      year: el.year,
      explanation: el.explanation,
    }))
    ,
    projects: data.projects.map(el => ({
      n: el.n,
      title: el.title,
      image_url: el.image_url,
      description: el.description,
      href: el.href
    }))

  }
  // const deldata =  await db.deleteData()
  res.render('home', context)
}