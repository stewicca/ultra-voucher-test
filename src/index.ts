// Logic Test
const arrayOfString: string[] = ["cook", "save", "taste", "aves", "vase", "state", "map"]

function mySort(arr: string[]) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i].localeCompare(arr[j]) > 0) {
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }

    return arr;
}

function areAnagrams(s1: string, s2: string): boolean {
    s1 = mySort(s1.split('')).join('');
    s2 = mySort(s2.split('')).join('');

    return s1 === s2;
}

const collectionOfAnagrams: string[][] = [];

const visited: Set<number> = new Set();

for (let i: number = 0; i < arrayOfString.length; i++) {
    if (visited.has(i)) continue;

    const arrayOfAnagrams: string[] = [arrayOfString[i]];
    visited.add(i);

    for (let j = i + 1; j < arrayOfString.length; j++) {
        if (areAnagrams(arrayOfString[i], arrayOfString[j])) {
            arrayOfAnagrams.push(arrayOfString[j]);
            visited.add(j);
        }
    }

    collectionOfAnagrams.push(arrayOfAnagrams);
}

console.log(collectionOfAnagrams);

console.log("=".repeat(50));

// Query Test
import Database from "better-sqlite3";

const database = new Database(":memory:");

database.exec(`
    CREATE TABLE data
    (
        id        INTEGER PRIMARY KEY,
        name      VARCHAR(50) NOT NULL,
        parent_id INTEGER
    );
`);

const insert = database.prepare("INSERT INTO data (id, name, parent_id) VALUES (?, ?, ?)");

insert.run(1, "Zaki", 2);
insert.run(2, "Ilham", null);
insert.run(3, "Irwan", 2);
insert.run(4, "Arka", 3);

const query = database.prepare(`
    SELECT id,
           name,
           (SELECT name FROM data d2 WHERE d2.id = d1.parent_id) parent_name
    FROM data d1
`);

console.log(query.all());
