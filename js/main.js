const Main = {

    task: [],


    init: function() {
        this.cacheSelectors()
        this.bindEvents()
        this.getStorage()
        this.buildFunction()
        
    },

    cacheSelectors: function(){
        this.$checkButtons = document.querySelectorAll(".check")
        this.$inputTask = document.querySelector("#inputTask")
        this.$list = document.querySelector("#list")
        this.$removeButtons = document.querySelectorAll(".remove")
    },

    bindEvents: function(){
        const self = this
        //this related to the js file
        this.$checkButtons.forEach(function(button){  
            //this related to the window  element in
            button.onclick = self.Events.checkButton_click.bind(self)
            }
        );

        this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(this)

        this.$removeButtons.forEach(function(button){  
            //this related to the window  element in
            button.onclick = self.Events.removeButton_click.bind(self)
            }
        );
    },

    getStorage: function(){
        const tasks = localStorage.getItem('tasks')
        this.task = JSON.parse(tasks)
    },

    buildTasks: function(task,status){
        let li =''
        console.log(status)
        if(status=='done'){
            li = `<li class="done">
            <div class="check .done" data-status ="${task}"></div>
            <label class="task">${task}</label>
            <button class="remove"  data-task ="${task}"></button>
        </li>`
        }else{
            li = `<li>
            <div class="check" data-status ="${task}"></div>
            <label class="task">${task}</label>
            <button class="remove"  data-task ="${task}"></button>
        </li>`   
        }
        return li
    },


    buildFunction: function(){
        let html = ''

        if(this.task!==null){

            this.task.forEach(item =>{


                html+= this.buildTasks(item.task,item.status)   
                

            })
        }

        this.$list.innerHTML = html
        
        this.cacheSelectors()
        this.bindEvents()

    },


    Events: {
        checkButton_click: function(e){
            const li = e.target.parentElement
            let status = 'check'

            console.log(this.task)

            if(!li.classList.contains('done')){
                li.classList.add('done')
                status = 'done'
                
            }else{
                li.classList.remove('done')
                status = 'check'
            }

            const value = e.target.dataset['status']

            this.task.forEach(
                item =>{
                    if(item.task === value){
                        item.status=status   
                    }
                    console.log(this.task)
                 }
            )
            
           localStorage.setItem('tasks',JSON.stringify(this.task))


        },

        inputTask_keypress: function(e){
            const key = e.key
            const value = e.target.value

            if(key==='Enter'){
                
                this.$list.innerHTML += this.buildTasks(value,'check')   
                

            e.target.value = ""
            this.cacheSelectors()
            this.bindEvents()
        
               
            let obj=[]
            const savedTasks = localStorage.getItem('tasks')
            const savedTasksObj = JSON.parse(savedTasks)
             
            if(savedTasksObj!==null){
                obj = [{task: value,status: 'check'},
                ...savedTasksObj,
                ]
            }else{
                obj = [{task: value,status: 'check'},
                ]   
            }

            this.task=obj
            localStorage.setItem('tasks',JSON.stringify(obj))
              
        
        
        }

        },

        

        removeButton_click: function(e){
            const li = e.target.parentElement
            const value = e.target.dataset['task']

            console.log(value)
            

            const newTaskState = this.task.filter(
            item => item.task !== value
            )

            this.task=newTaskState
            console.log(newTaskState)

            localStorage.setItem('tasks',JSON.stringify(newTaskState))            

            li.classList.add('removed')

            setTimeout(() => { 
              li.classList.add('hidden')  
            }, 300);

        },


    }

}

//inicio
Main.init()