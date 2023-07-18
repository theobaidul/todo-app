// eslint-disable-next-line import/no-extraneous-dependencies
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Divider, Input, List, Space } from 'antd';
import { useReducer, useState } from 'react';
import Styles from '../assets/css/TodoCard.module.css';
import getRandomId from '../utils/helper/getRandomId';

const initialState = [];

const todoReducer = (state, action) => {
    switch (action?.type) {
        case 'CREATE':
            return [...state, action?.payload];
        case 'DELETE':
            return state?.filter((item) => item.id !== action?.payload?.id);
        case 'UPDATE':
            return state?.map((item) => (item.id === action?.payload?.id ? action?.payload : item));
        default:
            return state;
    }
};

function TodoCard() {
    const [todo, setTodo] = useState('');
    const [todoList, dispatch] = useReducer(todoReducer, initialState);

    // eslint-disable-next-line consistent-return
    const createHandler = () => {
        const modifiedTodo = todo?.trim();
        if (!modifiedTodo) return undefined;
        dispatch({
            type: 'CREATE',
            payload: {
                id: getRandomId(),
                isSelected: false,
                todo,
            },
        });
        setTodo('');
    };

    const deleteHandler = (id) => {
        dispatch({
            type: 'DELETE',
            payload: {
                id,
            },
        });
        setTodo('');
    };

    const selectHandler = (item) => {
        dispatch({
            type: 'UPDATE',
            payload: {
                ...item,
                isSelected: !item?.isSelected,
            },
        });
        setTodo('');
    };

    return (
        <Card
            title="My Todo App"
            bordered={false}
            style={{
                width: 600,
                textAlign: 'center',
            }}
        >
            <Space direction="vertical" className={Styles.cardBody}>
                <Space.Compact
                    style={{
                        width: '100%',
                    }}
                >
                    <Input
                        placeholder="Enter a todo"
                        value={todo}
                        onChange={(e) => setTodo(e?.target?.value)}
                        onPressEnter={createHandler}
                    />
                    <Button type="primary" onClick={createHandler}>
                        Submit
                    </Button>
                </Space.Compact>
                <Divider orientation="left">Todo List</Divider>
                <List
                    bordered
                    dataSource={todoList}
                    renderItem={(item) => (
                        <List.Item>
                            <Checkbox
                                onChange={() => selectHandler(item)}
                                checked={item?.isSelected}
                            >
                                {item?.todo}
                            </Checkbox>
                            <Button type="primary" danger onClick={() => deleteHandler(item?.id)}>
                                <DeleteOutlined />
                            </Button>
                        </List.Item>
                    )}
                />
            </Space>
        </Card>
    );
}
export default TodoCard;
