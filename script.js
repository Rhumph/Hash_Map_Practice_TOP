class HashMap {
  constructor(size) {
    this.size = size;
    this.hmArray = Array.from({ length: size }, () => new LinkedList());
  }

  set(key, value) {
    const hashNode = { key, value };
    const hashedHN = hash(hashNode.key, this.hmArray.length);
    const bucketLLN = new Node(hashedHN, value);
    console.log(hashedHN);

    this.hmArray[hashedHN].append(bucketLLN.key, bucketLLN.value);
  }

  get(key) {
    // indexCheck(key)
    let target = this.hmArray[key];
    let targetValues = [];

    if (target) {
      let current = target.head;
      while (current !== null) {
        targetValues.push(current.value);
        console.log(current.value);
        current = current.next;
      }
      return targetValues;
    } else {
      return null;
    }
  }

  has(key) {
    let hasKey = false;

    this.hmArray.forEach((bucket) => {
      let current = bucket.head;

      while (current !== null) {
        if (current.key === key) {
          hasKey = true;
          console.log(hasKey);
          return String(hasKey);
        } else {
          current = current.next;
        }
      }
    });
    console.log(hasKey);
    return String(hasKey);
  }

  remove(key) {
    let target = this.hmArray[key];

    if (target === null) {
      console.log("False");
      return String("False");
    } else if (target !== null) {
      console.log("pre" + target);
      target.head = null;
      console.log("post" + target);
      console.log("True");
      return String("true");
    }
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(key, value) {
    const newNode = new Node(key, value);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }
}

class Node {
  constructor(key, value, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

function indexCheck(index) {
  if (index < 0 || index >= buckets.length) {
    throw new Error("Trying to access index out of bound");
  }
}

function hash(key, buckets) {
  let hashCode = 0;

  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = primeNumber * hashCode + key.charCodeAt(i);
    hashCode = hashCode % buckets;
  }

  return hashCode;
}

let testHM = new HashMap(16);
testHM.set("Carla", "Jenkins");
testHM.set("Carla", "Lester");
testHM.set("Carl", "Jenkin");
testHM.get(8);
testHM.has(9);
testHM.remove(9);
testHM.has(9);

console.log(testHM.hmArray);
