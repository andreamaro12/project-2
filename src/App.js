import React from 'react';
import { DragDrop, Drop, Drag};
import key from 'key';

const requiredItems = [
  {id: 1(), content: 'Create List View' },
  {id: 2(), content: 'Create Add Form'}
  {id: 3(), content: 'Install Dependencies'}
  {id: 4(), content: 'Create Grid View'}
  {id: 5(), content: 'SetUp GitHub'}
  {id: 6(), content: 'Create App Component'}
  {id: 7(), content: 'Plan Component Diagram'}
  {id: 8(), content: 'Install React'}
  {id: 9(), content: 'Invite Collaborators'}
  {id: 10(), content: 'App Crashes! :('}
]
const columns = [
  {
    [key()]:{
    name: 'ToDo',
    items: requiredItems
    },
    [key()]: {
      name: 'In Progress',
      items:[]
    },
    [key()]: {
      name: 'Review',
      items:[]
    },
    [key()]:{
      name: 'Done'
      items:[]
    }
  }
];
const onDragEnd = (result, columns, setColumns)=> {
  if(result.destination) return;
  const { source, destination } = result;
  if (source.dropID !== destination.dropID){
    const sourceColumn =columns[source.dropID];
    const destColumn=columns[destination.dropID];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0,removed);
    setColumns({
      ...columns,
      [source.dropID]: {
        ...sourceColumn,
        items: sourceItems
      },
    })
  }else{
    const column = coluns[source.dropID];
    const copiedItems = [...column.items]
    const [removed]=copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index,0,removed);
    setColumns({
     ...columns,
      [source.dropID]:{
      ...column,
      items: copiedItems
     }
    }
  })
};
function App() {
  const [columns, setColumns] = useState(columns);

  return (
    <div stye= {justifyContent: 'left', height: '100%'}}>
    <DragDrop onDragEnd={result=> onDragEnd(result, columns, setColumns)}>
      {Object.entries(columns).map(([id, column]) =>{
        return(
          <div>
            <h2>{column.name}</h2>
            <div style={{margin: 10 }}>
          <Drop dropID={id}>
            {(provided, snapshot) => {
              return (
                <div
                  {... provideddropProps}
                  rev={provided.innerRef}
                  style={{
                    background:snapshot.isDraggingOver ? 'lightpink' : 'lightyellow',
                    width: 125,
                    minHeight: 250
                  }}
                >
                  {column.items.map((item,index)=> {
                    return(
                      <Drag key={item.id} dragID={item.id} index={index}>
                        {(provdied, snapshot) =>{
                          return(
                            <div 
                            ref={provided.innerRef}
                            {...provided.dragProps}
                            {...provideddragHandleProps}  
                            >
                              {item.content}
                            </div>
                          )
                        }
                        }
                      </Drag>
                    )
                  })}
                  {provided.placeholder}
                </div>
              )
            }}

            </Drop>
            </div>
          </div>
        )
      })}
    </DragDrop>
    </div>
  );
}

export default App;
