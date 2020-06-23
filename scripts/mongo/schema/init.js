const conn = new Mongo()
const db = conn.getDB('cw-project-radar')

db.sequences.insert({ _id: 'project', seq: 0 })

db.users.insert({
    name: 'admin',
    email: 'cyber@cyberwatching.eu',
    password: '$2a$12$.n4NvG1ok5vxZYhf032Mn.QK9ZX9tDs2Gs3LRkIq.9lqxwxYV9T8K',
    role: 'admin',
    active: true
})
