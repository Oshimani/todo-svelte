export class MockStore {

    private static _instance: MockStore;
    private static _store: any[] = [];

    public static get instance() {
        if (!MockStore._instance) {
            MockStore._instance = new MockStore()
        }
        return MockStore._instance;
    }

    public getAll() {
        console.log(MockStore._store);
        return MockStore._store;
    }

    public add(todo) {
        MockStore._store = [{...todo, _id:Math.random()}, ...MockStore._store];
        console.log(MockStore._store);

    }

    public toggleCompleted(id) {
        const index = MockStore._store.findIndex(t => t._id === id)
        if (index > -1)
            MockStore._store[index].completed = !MockStore._store[index].completed;
    }

    public toggleImportant(id) {
        const index = MockStore._store.findIndex(t => t._id === id)
        if (index > -1)
            MockStore._store[index].important = !MockStore._store[index].important;
    }

    public delete(id) {
        MockStore._store = MockStore._store.filter(t => t._id !== id);
    }

    public updateTitle(id, title) {
        const index = MockStore._store.findIndex(t => t._id === id)
        if (index > -1)
            MockStore._store[index].title = title;
    }
}