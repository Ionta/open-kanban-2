import { AppShell, Burger, Container, Flex } from "@mantine/core";
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

interface KanbanBoardProps
{

}

interface ITask
{
    id: number;
    order: number;
    title: string;
    description: string;
}

interface IColumns{
    id: number;
    order: number;
    tasks: ITask[];
}

class ColumnsService
{
    private columns : IColumns[] = [];
    
    constructor(){
        makeAutoObservable(this);
    }

    get Columns() : ReadonlyArray<IColumns>  {
        return this.columns;
    }

    syncColumns(){
        this.columns = [
            {
                id: 1,
                order: 0,
                tasks: []
            },
            {
                id: 2,
                order: 1,
                tasks: []
            },
            {
                id: 3,
                order: 2,
                tasks: []
            },
        ]
    }

    syncTask(columnId: number, take: number, skip: number){
        if (columnId == 1){
            let column = this.columns.find(x => x.id == columnId);
            column!.tasks = [
                {
                    id: 1,
                    order: 1,
                    title: "Test-1",
                    description: "Hello world"
                },
                {
                    id: 2,
                    order: 2,
                    title: "Test-2",
                    description: "Hello-world"
                },
                {
                    id: 3,
                    order: 3,
                    title: "Test-3",
                    description: "Hello"
                }
            ]
        }
    }
}

function KanbanBoard(props: KanbanBoardProps)
{
    const [store, _] = useState(new ColumnsService());

    useEffect(() => {
        const init = async () => {
            await store.syncColumns();
            await store.syncTask(1, 15, 0);

            console.log(store.Columns);
        };

        init();
    },[]);

    return(
        <AppShell
        padding="md"
        header={{ height: 60 }}
        navbar={{
            width: 300,
            breakpoint: 'sm',
        }}
        >
            <AppShell.Header>
                <Flex justify={"space-between"} p={10}> 
                    <Text>Тестовая доска 1</Text>
                    <Flex direction={"row"} gap={25}>
                        <Flex gap={5}>
                            <div style={{backgroundColor: "black", color: "white", width: "200px"}}> <span>Фильтры 1</span> </div>
                            <Button>Найти</Button>
                        </Flex>
                        
                        <Button>Архивировать доску</Button>
                    </Flex>
                </Flex>
                
            </AppShell.Header>

            <AppShell.Navbar>
                <Flex direction={"column"} gap={10}>
                    <Button>Создать новую доску</Button>
                    <Text>Тестовая доска 1</Text>
                    <Text>Тестовая доска 2</Text>
                    <Text>Тестовая доска 3</Text>
                </Flex>
            </AppShell.Navbar>

            <AppShell.Main>
                <Container strategy="grid">
                    <Flex gap={15}>
                        {store.Columns.map(x => <Column>{x.tasks.map(t => <Demo title={t.title} description={t.description}></Demo>)}</Column>)}
                    </Flex>
                </Container>
            </AppShell.Main>
        </AppShell>
    )
}

function Column(props: {children: any}){
    return(
        <Flex direction={"column"} gap={10} p={20} bg={"gray"} w={300}>
            {props.children}
        </Flex>
    )
}

function Demo(props: {title: string, description: string}) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{props.title}</Text>
        <Badge color="pink">On Sale</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {props.description}
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
  );
}

export default observer(KanbanBoard)