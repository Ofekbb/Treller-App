import { GrUp } from 'react-icons/gr'
import { onEditBoard } from '../store/board.actions'
import { utilService } from './util.service'


export const taskService = {
    getTaskById,
    updateTask,
    addTask,
    editGroupTitle,
    createNewTaskList,
    getLabels,
    toggleLabelToTask,
    addLabelToBoard,
    updateLabel,
    removeLabel,
    addGroup,
    updateGroups,
    saveDueDateToTask,
    removeDueDateToTask,
    toggleCoverToTask,
    isImg,
    getImgsFromTask,
    getGroupTitle,
    toggleUserToTask,
    toggleUserToBoard,
    changeBackground,
    labelsBoardCount,
    MembersTaskCount,
    taskTimeCheck,
    MembersTaskCount
}


function changeBackground(board, backgroundUrl) {
    board.style.bgImg = backgroundUrl;
    return board;
}

function isImg(attachSrc) {
    return (attachSrc.endsWith('.png') || attachSrc.endsWith('.jpg') || attachSrc.endsWith('.ico') || attachSrc.endsWith('.gif') || attachSrc.endsWith('.svg'))
}

function getImgsFromTask(task) {
    let imgs = []
    if (task.attachments) {
        task.attachments.forEach((attach) => {
            if (attach.isImg) {
                imgs.push(attach)
            }
        })
    }
    if (imgs.length <= 0) return null
    return imgs
}

function getTaskById(board, taskId) {
    if (!board) return
    let taskToReturn = null
    board.groups.map(group => {

        group.tasks = group.tasks.map(task => {
            if (task.id === taskId) {
                taskToReturn = task

            }
            return task
        })

        return group.tasks
    })
    return taskToReturn
}

function getGroupTitle(board, taskId) {
    if (!board) return;
    const group = board.groups.find(group => group.tasks.find(task => task.id === taskId))
    const groupTitle = group?.title;
    return groupTitle;
}

function updateTask(board, updatedTask) {
    board.groups = board.groups.map(group => {
        group.tasks = group.tasks.map(task => {
            if (task.id === updatedTask.id) {
                return updatedTask
            } else return task

        })
        return group
    })
    return board
}

function addTask(board, groupId, title) {
    const task = {
        id: utilService.makeId(),
        isArchive: false,
        title,
        style: {
            cover: null
        },
    };
    board.groups.map((group) => {
        if (group.id === groupId) {
            if (group.tasks) {
                group.tasks.push(task);
            } else group.tasks = [task]
        }
    });
    return board;
}

function createNewTaskList(board, taskId, title = "New Check List") {
    const newTask =
    {
        "id": utilService.makeId(),
        "title": title,
        "todos": [
            {
                "id": utilService.makeId(),
                "title": undefined,
                "isDone": false
            }
        ],
    }

    board.groups.map(group => {
        group.tasks = group.tasks.map(task => {
            if (task.id === taskId) {
                if (!task.checklists) task.checklists = []
                task.checklists.push(newTask)
            }
            return task
        })

        return group.tasks

    })
    return board
}

function editGroupTitle(board, groupId, groupTitle) {
    board.groups.map((group) => {
        if (group.id === groupId) {
            group.title = groupTitle
        }
    });
    return board;
}

function getLabels(board) {
    if (board.labels) {
        return board.labels
    }
}

function addLabelToBoard(board, color, title = null) {
    const newLabel = {
        "id": utilService.makeId(),
        "title": title,
        "color": color
    }
    board.labels.push(newLabel)
    return board
}

function toggleLabelToTask(board, taskId, label) {

    board.groups.map(group => {
        group.tasks = group.tasks.map(task => {
            if (task.id === taskId) {
                if (!task.labels) {
                    task.labels = []
                }

                let isExist = task.labels.some(taskLabel => taskLabel.id == label.id)

                if (isExist) {
                    task.labels = [...task.labels.filter(taskLabel => taskLabel.id !== label.id)]

                }
                else {
                    task.labels.push(label)
                }
            }
            return task
        })

        return group.tasks
    })
    return board
}

function toggleUserToTask(board, taskId, user) {

    board.groups.map(group => {
        group.tasks = group.tasks.map(task => {
            if (task.id === taskId) {
                if (!task.members) {
                    task.members = []
                }

                let isExist = task.members.some(taskMember => taskMember._id == user._id)

                if (isExist) {
                    task.members = [...task.members.filter(taskMember => taskMember._id !== user._id)]

                }
                else {
                    task.members.push(user)
                }
            }
            return task
        })

        return group.tasks
    })
    return board
}
function toggleUserToBoard(board, user) {

    if (!board.members) {
        board.members = []
    }
    let isExist = board.members.some(boardMember => boardMember._id == user._id)

    if (isExist) {
        board.members = [...board.members.filter(boardMember => boardMember._id !== user._id)]

    }
    else {
        board.members.push(user)
    }


    return board
}

function updateLabel(board, updatedLabel) {
    board.labels = [...board.labels.map(label => label.id === updatedLabel.id ? updatedLabel : label)]
    return board
}

function removeLabel(board, labelToRemove) {
    board.labels = [...board.labels.filter(label => label.id !== labelToRemove.id)]
    return board
}

function addGroup(board, groupTitle) {
    const group = {
        id: utilService.makeId(),
        title: groupTitle,
        style: {},
        isArchive: false,
        tasks: []
    }
    board.groups.push(group)
    return board;
}

function updateGroups(board, groups) {
    board.groups = groups
    return board
}

function saveDueDateToTask(board, taskId, dueDate) {
    board.groups.map(group => {
        group.tasks = group.tasks.map(task => {
            if (task.id === taskId) {
                task.dueDate = dueDate
            }
            return task
        })
        return group.tasks
    })
    return board
}

function removeDueDateToTask(board, taskId) {
    board.groups.map(group => {
        group.tasks = group.tasks.map(task => {
            if (task.id === taskId) {
                task.dueDate = null
            }
            return task;
        })

        return group.tasks;
    })
    return board;
}

function toggleCoverToTask(board, taskId, cover) {
    board.groups.map(group => {
        group.tasks = group.tasks.map(task => {
            if (task.id === taskId) {
                if (task.style.cover == cover) {
                    delete task.style.cover
                } else task.style.cover = cover;
            }
            return task;
        })
        return group.tasks;
    })
    return board;
}


function labelsBoardCount(board, boardLabels) {
    let count = 0;
    let boardLabelCount = []
    boardLabels.forEach(boardLabel => {
        board.groups.forEach(group => {
            group.tasks.forEach(task => {
                if (task.labels?.length > 0) {
                    task.labels.forEach(label => {
                        if (label.title === boardLabel) {
                            if (!boardLabelCount[count]) boardLabelCount[count] = 0
                            boardLabelCount[count]++
                        }
                    })
                }
            })
        })
        count++
    })

    return boardLabelCount
}

function MembersTaskCount(board, members) {
    let count = 0;
    let tasksPerMember = []
    members.forEach(memberName => {
        board.groups.forEach(group => {
            group.tasks.forEach(task => {
                if (task.members?.length > 0) {
                    task.members.forEach(member => {
                        if (member.fullname === memberName) {
                            if (!tasksPerMember[count]) tasksPerMember[count] = 0
                            tasksPerMember[count]++
                        }
                    })
                }
            })
        })
        count++
    })

    return tasksPerMember
}

function taskTimeCheck(board) {
    let countBoardTimeMap = {
        countDueDate: 0,
        countDueSoon: 0,
        taskCount: 0
    }
    const day = 1000 * 60 * 60 * 24



    board.groups.forEach((group) => {
        group.tasks.forEach((task) => {
            countBoardTimeMap.taskCount++
            if (task.dueDate) {
                // const duDate = new Date(task.dueDate);
                // const now = new Date();
                if (!task.isDone && Date.now() > task.dueDate) {
                    countBoardTimeMap.countDueDate++
                    return
                }
                if (!task.isDone && Date.now() + 3 * day > task.dueDate && Date.now() < task.dueDate) {
                    countBoardTimeMap.countDueSoon++
                }




            }
        })
    })

    // countBoardTimeMap.countDueDate = (countBoardTimeMap.countDueDate / countBoardTimeMap.taskCount) * 100
    // countBoardTimeMap.countDueSoon = (countBoardTimeMap.countDueSoon / countBoardTimeMap.taskCount) * 100

    return countBoardTimeMap

}