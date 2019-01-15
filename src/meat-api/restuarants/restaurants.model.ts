import * as mongoose from 'mongoose';

export interface Restaurant extends mongoose.Document {
    name: string,
    menu: MenuItem[]
}