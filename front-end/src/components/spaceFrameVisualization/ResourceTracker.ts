class ResourceTracker {
  resources: any;
  constructor() {
    this.resources = new Set();
  }
  track(resource: any) {
    if (resource.dispose) {
      this.resources.add(resource);
    }
    return resource;
  }
  untrack(resource: any) {
    this.resources.delete(resource);
  }
  dispose() {
    for (const resource of this.resources) {
      resource.dispose();
    }
    this.resources.clear();
  }
}

export default ResourceTracker;
