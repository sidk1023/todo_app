
interface TaskInterface{
   _id: string;
   collectionId: string;
   date: Date;
   completionDate: Date;
   text: string;
}

interface CollectionInterface{
    _id: string;
    name: string;
}

export type {TaskInterface, CollectionInterface}