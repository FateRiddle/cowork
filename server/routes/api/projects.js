const router = require('express').Router()
const { sql,db } = require('../../db')

router.get('/', (req, res, next) => {
  db.then( pool => {
    return pool.request()
    .query(
      `select * from tb_cowork_project; select * from tb_cowork_project_group`
    )
  })
  .then(data => {
      //将group内容并入project
      const projects = data.recordsets[0]
      const groups = data.recordsets[1]
      data.recordset = projects.map(project => {
        return Object.assign({},project,
          {
            group:groups.filter(group => group.projectId === project.id)
            .map(group => group.userId)
          }
        )
      })
      res.send(data)
  }).catch(err => {
    console.error(err)
  })
})

router.post('/', (req, res, next) => {
  const { id,title,group } = req.body
  let groupValue = group
    .map(item => {return `('${id}',${item})`})
    .reduce((a,b) => a + ',' + b)
  db.then( pool => {
    return pool.request()
    .query(`
      begin tran
        insert into tb_cowork_project (id,title)
        values('${id}','${title}')
        insert into tb_cowork_project_group (projectId,userId)
        values ${groupValue}
      if @@error != 0
      rollback tran
      commit tran
    `)
  })
  .then(data => {res.send(data)})
  .catch(err => {
    console.error(err)
  })
})

router.put('/', (req, res, next) => {
  const { id,title,group } = req.body
  let groupValue = group
    .map(item => {return `('${id}',${item})`})
    .reduce((a,b) => a + ',' + b)

  db.then( pool => {
    return pool.request()
    .query(`
      begin tran
        update tb_cowork_project set
        title = '${title}'
        where id = '${id}'
        delete tb_cowork_project_group
        where projectId = '${id}'
        insert into tb_cowork_project_group(projectId,userId)
        values ${groupValue}
      if @@error != 0
      rollback tran
      commit tran
    `)
  })
  .then(data => {res.send(data)})
  .catch(err => {
    console.error(err)
  })
})

module.exports = router
