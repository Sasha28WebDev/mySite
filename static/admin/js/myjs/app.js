//let mainCard = document.querySelector('#main-card')
const containerScroller = document.querySelector('.container-scroller')

//-----------------------main-card-------------
const firstName = containerScroller.querySelector("#name")
const surname = containerScroller.querySelector("#surname")
const userId = containerScroller.querySelector("#user-id")
const github = containerScroller.querySelector('#github')
const qualification = containerScroller.querySelector('#qualification')
const mainSaveBtn = containerScroller.querySelector('#main-save-btn')
//------------------------------------
//-----------------------about-card-------------
const aboutText = containerScroller.querySelector("#about-text")
//------------------------------------
//-----------------------info-card-------------
//const infoHeading = containerScroller.querySelector("#info-heading")
const infoLocation = containerScroller.querySelector("#info-location")
const infoEmail = containerScroller.querySelector("#info-email")
const infoWebsite = containerScroller.querySelector("#info-website")
//------------------------------------
//-----------------------project-card-------------
const projectHeading = containerScroller.querySelector("#project-heading")
const projectTitles = containerScroller.querySelector("#project-titles")
const projectId = containerScroller.querySelector("#project-id")
const projectImage = containerScroller.querySelector("#project-image")
const projectDescription = containerScroller.querySelector("#project-description")
const projectLink = containerScroller.querySelector("#project-link")
const projectTitle = containerScroller.querySelector("#project-title")
const projectDelBtn = containerScroller.querySelector("#project-del-btn")
//-----------------------skill-card-------------
const skillTitles = containerScroller.querySelector("#skill-titles")
const skillId = containerScroller.querySelector("#skill-id")
const skillName = containerScroller.querySelector("#skill-name")
const skillLevel = containerScroller.querySelector("#skill-level")
const skillProgress = containerScroller.querySelector("#skill-progress")
const skillDelBtn = containerScroller.querySelector("#skill-del-btn")
//------------------------------------
//-----------------------experience-card-------------
const expTitles = containerScroller.querySelector("#exp-titles")
const expId = containerScroller.querySelector("#exp-id")
const expTitle = containerScroller.querySelector("#exp-title")
const expPlace = containerScroller.querySelector("#exp-place")
const expYear = containerScroller.querySelector("#exp-year")
const expExplanation = containerScroller.querySelector("#exp-explanation")
//------------------------------------
const headerHelloName = containerScroller.querySelector('#header-hello-name')

function sendReq({ url, id = null, method = 'GET', body = null }) {
    const headers = { 'Content-Type': 'application/json' }
    if (id) { url += `/${id}` }
    return fetch(url, {
        method,
        body,
        headers: headers
    }).then(res => {
        if (res.ok) { return res.json() }
        return res.json().then(error => {
            const e = new Error('error')
            e.data = error
            throw e
        })
    })
}

//sendReq('')
window.addEventListener('load', () => {
    let url = '/api/content'
    sendReq({ url })
        .then(data => {
            console.log(data)
            headerHelloName.innerHTML = `${data.name} ${data.surname}`
            firstName.value = data.name
            surname.value = data.surname
            userId.value = data._id
            github.value = data.github
            qualification.value = data.qualification
            aboutText.value = data.about
            //infoHeading.value = data.info.heading
            infoLocation.value = data.location
            infoWebsite.value = data.website
            infoEmail.value = data.email
            data.projects.forEach(el => {
                projectTitles.innerHTML += `<option>${el.title}</option>`
            });
            projectImage.value = ''
            projectDescription.value = ''
            projectLink.value = ''
            projectTitle.value = ''
            projectId.value = ''
            data.skills.forEach(el => {
                console.log(el)
                skillTitles.innerHTML += `<option>${el.skill_name}</option>`
            });
            skillName.value = ''
            skillLevel.value = ''
            skillProgress.value = ''
            skillId.value = ''
            data.experience.forEach(el => {
                console.log(el)
                expTitles.innerHTML += `<option>${el.title}</option>`
            });
            expTitle.value = ''
            expYear.value = ''
            expId.value = ''
            expExplanation.value = ''
        })
        .catch(err => { console.log(err) })
})


document.addEventListener('change', (evt) => {
    let url = '/api/content'
    switch (evt.target.id) {
        case ('project-titles'): {
            if (evt.target.value != 'Новый') {
                sendReq({ url: `/api/projects` })
                    .then(data => {
                        data = data[0]
                        console.log(data)
                        const projectID = data.projects.findIndex(el => el.title === evt.target.value)
                        console.log(projectID)
                        console.log(data.projects[projectID]._id)
                        projectLink.value = data.projects[projectID].href
                        projectId.value = data.projects[projectID]._id
                        projectDescription.value = data.projects[projectID].description
                        projectImage.value = data.projects[projectID].image_url
                        projectTitle.value = data.projects[projectID].title
                        projectDelBtn.removeAttribute('hidden')
                        console.log(data)
                    })
                    .catch(err => { console.log(err) })
            } else {

                projectDelBtn.setAttribute('hidden', '')
                projectImage.value = ''
                projectDescription.value = ''
                projectLink.value = ''
                projectTitle.value = ''
                projectId.value = ''
            }
            break
        }
        case ('skill-titles'): {
            if (evt.target.value != 'Новый') {
                sendReq({ url: `/api/skills` })
                    .then(data => {
                        data = data[0]
                        console.log(data)
                        const skillID = data.skills.findIndex(el => el.skill_name === evt.target.value)
                        console.log(skillID)
                        console.log(data.skills[skillID]._id)
                        skillId.value = data.skills[skillID]._id
                        skillName.value = data.skills[skillID].skill_name
                        skillLevel.value = data.skills[skillID].level
                        skillProgress.value = data.skills[skillID].progress
                        skillDelBtn.removeAttribute('hidden')
                        console.log(data)
                    })
                    .catch(err => { console.log(err) })
            } else {

                skillDelBtn.setAttribute('hidden', '')
                skillName.value = ''
                skillLevel.value = ''
                skillProgress.value = ''
                skillId.value = ''

            }
            break
        }
        case ('exp-titles'): {
            /* if (evt.target.value != 'Новый') {
                sendReq({ url: `/api/skills` })
                    .then(data => {
                        data = data[0]
                        console.log(data)
                        const skillID = data.skills.findIndex(el => el.skill_name === evt.target.value)
                        console.log(skillID)
                        console.log(data.skills[skillID]._id)
                        skillId.value = data.skills[skillID]._id
                        skillName.value = data.skills[skillID].skill_name
                        skillLevel.value = data.skills[skillID].level
                        skillProgress.value = data.skills[skillID].progress
                        skillDelBtn.removeAttribute('hidden')
                        console.log(data)
                    })
                    .catch(err => { console.log(err) })
            } else {

                skillDelBtn.setAttribute('hidden', '')
                skillName.value = ''
                skillLevel.value = ''
                skillProgress.value = ''
                skillId.value = ''

            }
            break */
        }
        default: { }
    }
})


document.addEventListener('click', (evt) => {
    evt.preventDefault()
    let url = '/api/content'
    switch (evt.target.id) {
        case ('main-save-btn'): {
            const dataFromForm = {
                block: 'main',
                name: firstName.value,
                surname: surname.value,
                github: github.value,
                qualification: qualification.value
            }
            sendReq({ url, method: 'PUT', body: JSON.stringify(dataFromForm) })
                .then(data => {
                    console.log(data)
                })
                .catch(err => { console.log(err) })
            break
        }
        case ('about-save-btn'): {
            const dataFromForm = {
                id: userId.value,
                block: "about",
                about: aboutText.value,
            }
            sendReq({ url, method: 'PUT', body: JSON.stringify(dataFromForm) })
                .then(data => {
                    console.log(data)
                })
                .catch(err => { console.log(err) })
            break
        }
        case ('info-save-btn'): {
            const dataFromForm = {
                id: userId.value,
                block: "info",
                location: infoLocation.value,
                website: infoWebsite.value,
                email: infoEmail.value
            }
            console.log(dataFromForm)
            sendReq({ url, method: 'PUT', body: JSON.stringify(dataFromForm) })
                .then(data => {
                    //console.log(data)
                })
                .catch(err => { console.log(err) })
            break
        }
         case ('skill-del-btn'): {
            const skill_id = skillId.value
            dataFromForm = {
                skill_id,
                id: userId.value,
                block: 'skills',
            }
            sendReq({ url:'/api/contentdel', method: 'PUT', body: JSON.stringify(dataFromForm) })
                .then(data => {
                    console.log(data)
                })
                .catch(err => { console.log(err) })
            break
        }
        case ('skill-save-btn'): {
            const skill_id = skillId.value
            const dataFromForm = {
                skill_id,
                id: userId.value,
                block: 'skills',
                skill_name: skillName.value,
                level: skillLevel.value,
                progress: skillProgress.value
            }
            console.log(dataFromForm)
            sendReq({ url, method: 'PUT', body: JSON.stringify(dataFromForm) })
                .then(data => {
                    console.log(data)
                })
                .catch(err => { console.log(err) })
            
            break
        } 
        case ('project-del-btn'): {
            const pr_id = projectId.value
            dataFromForm = {
                pr_id,
                id: userId.value,
                block: 'projects',
            }
            sendReq({ url: '/api/contentdel', method: 'PUT', body: JSON.stringify(dataFromForm) })
                .then(data => {
                    console.log(data)
                })
                .catch(err => { console.log(err) })
            break
        }
        case ('project-save-btn'): {
            const pr_id = projectId.value
            const dataFromForm = {
                pr_id,
                id: userId.value,
                block: 'projects',
                title: projectTitle.value,
                image_url: projectImage.value,
                description: projectDescription.value,
                link: projectLink.value
            }
            console.log(dataFromForm)
            sendReq({ url, method: 'PUT', body: JSON.stringify(dataFromForm) })
                .then(data => {
                    console.log(data)
                })
                .catch(err => { console.log(err) })
            break
        }
        default: { }
    }
})

