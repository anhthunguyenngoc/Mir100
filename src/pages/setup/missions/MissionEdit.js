import React, { useEffect, useState, cloneElement, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDroppable } from '@dnd-kit/core';

import * as Icons from '../../../components/icons';
import * as Const from '../../../constant';
import * as api from '../../../api';
import * as utils from '../../../canvas/utils';
import * as Comp from '../../../components';
import * as mUtils from '../../../utils';
import { convertMissionGroupFromApi } from './action-block';
import { hex } from 'framer-motion';

// Thêm component DropZone
const DropZone = ({ id, isActive, children, className = '', style = {} }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  const dropZoneStyle = {
    ...style,
    transition: 'all 0.2s ease-in-out',
    border: isOver
      ? '2px dashed #3b82f6'
      : isActive
        ? '2px dashed #cbd5e1'
        : '1px solid #cbd5e1',
    backgroundColor: isOver ? '#dbeafe' : isActive ? '#f1f5f9' : '#f8fafc',
    borderRadius: '6px',
    position: 'relative',
  };

  return (
    <div
      ref={setNodeRef}
      className={`drop-zone ${className} padding-15px`}
      style={dropZoneStyle}
    >
      {children}
      {isOver && (
        <div
          className="absolute-pos translate-center"
          style={{
            color: '#3b82f6',
            pointerEvents: 'none',
          }}
        >
          Drop here
        </div>
      )}
    </div>
  );
};

const ScopeTaskContainer = ({
  task,
  scopeParam,
  children,
  activeId,
  onDeleteSubTask,
  updateSubTaskParameterValueInList,
  updateTaskOrSubTaskProps,
}) => {
  const droppableId = `scope-${task.uniqueId}-${scopeParam.id}`;
  const isDragActive = activeId && activeId.toString().startsWith('palette-');

  return (
    <DropZone
      id={droppableId}
      isActive={isDragActive}
      className="scope-task-container flex col"
    >
      <div className="scope-content flex col gap-15px">
        {/* Placeholder khi trống */}
        {(!task.subtasks?.[scopeParam.id] ||
          task.subtasks[scopeParam.id].length === 0) && (
          <div
            className="drop-placeholder padding-5px"
            style={{
              color: '#9ca3af',
              textAlign: 'center',
              fontStyle: 'italic',
            }}
          >
            Drop tasks here for {scopeParam.name}
          </div>
        )}

        {/* Render subtasks */}
        {(task.subtasks?.[scopeParam.id] || []).map((subtask, index) => (
          <React.Fragment key={subtask.uniqueId}>
            {/* Drop zone trước mỗi subtask */}
            {isDragActive && (
              <DropZone
                id={`${droppableId}-before-${index}`}
                isActive={isDragActive}
                style={{ minHeight: '8px', margin: '4px 0' }}
              />
            )}

            <SortableTask
              task={subtask}
              isActive={false}
              onDelete={() =>
                onDeleteSubTask(task.uniqueId, subtask.uniqueId, scopeParam.id)
              }
              updateParameterValueInList={(paramId, newValue) => {
                updateSubTaskParameterValueInList(
                  task.uniqueId,
                  subtask.uniqueId,
                  scopeParam.id,
                  paramId,
                  newValue
                );
              }}
              onDeleteSubTask={() => {}}
              updateSubTaskParameterValueInList={() => {}}
              activeId={activeId} // Truyền activeId xuống subtask
              updateTaskOrSubTaskProps={updateTaskOrSubTaskProps}
            />
          </React.Fragment>
        ))}

        {/* Drop zone cuối cùng */}
        {isDragActive && task.subtasks?.[scopeParam.id]?.length > 0 && (
          <DropZone
            id={`${droppableId}-end`}
            isActive={isDragActive}
            style={{ minHeight: '8px', margin: '4px 0' }}
          />
        )}
      </div>
    </DropZone>
  );
};

const WorkspaceDropZone = ({ activeId, children }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'workspace-dropzone',
  });

  const isDragActive = activeId && activeId.toString().startsWith('palette-');

  const dropZoneStyle = {
    transition: 'all 0.2s ease-in-out',
    border: isOver
      ? '2px dashed #3b82f6'
      : isDragActive
        ? '2px dashed #d1d5db'
        : '2px dashed #e2e8f0',
    backgroundColor: isOver ? '#dbeafe' : isDragActive ? '#f8fafc' : 'white',
    borderRadius: '8px',
    padding: '20px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    flex: '1',
  };

  return (
    <div
      ref={setNodeRef}
      className="workspace-drop-zone full-height task-sequence"
      style={dropZoneStyle}
    >
      {children}
      {isDragActive && (
        <div
          className="drop-placeholder"
          style={{
            color: '#9ca3af',
            textAlign: 'center',
            padding: '40px 20px',
            fontStyle: 'italic',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <Icons.Board color="#9ca3af" />
          Drop your first task here to start building your mission
        </div>
      )}
    </div>
  );
};

const SortableTask = ({
  task,
  isActive,
  onDelete,
  updateParameterValueInList,
  onDeleteSubTask,
  updateSubTaskParameterValueInList,
  activeId,
  updateTaskOrSubTaskProps,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.uniqueId,
    data: {
      type: 'workspace-task',
      task: task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const scopeParams = mUtils.getScopeParams(task);
  const subtasks = task.subtasks || {};
  const isDragActive = activeId && activeId.toString().startsWith('palette-');

  return (
    <div className="sortable-task-wrapper">
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        className={`sortable-task flex col full-width center ${isActive ? 'active' : ''}`}
      >
        <Action
          color={task.color}
          actionStyle={{
            height: '60px',
            border: `1px solid ${task.color}`,
            width: '100%',
            ...(scopeParams.length > 0 ? { borderBottomRightRadius: '0' } : {}),
          }}
          iconContainerStyle={{ padding: '5px' }}
          icon={task.icon}
          iconColor={{
            mainColor: '#ffffff66',
            subColor: '#ffffff',
            overlayColor: task.color,
            width: '100%',
            height: '100%',
          }}
        >
          <div
            className="flex row align-center gap-10px flex-1"
            style={{ padding: '5px 10px' }}
          >
            {/* Priority Badge */}
            <div
              className="priority-badge flex center"
              style={{
                backgroundColor: '#ffffff',
                color: task.color,
                borderRadius: '12px',
                padding: '2px 8px',
                fontSize: '12px',
                fontWeight: 'bold',
                border: `1px solid ${task.color}`,
                minWidth: '24px',
                height: '20px',
              }}
            >
              {task.priority || 1}
            </div>

            <span className="nowrap">{task.name}</span>
            <Comp.ConditionInput
              type={task.action_type}
              color={task.color}
              options={task.parameters}
              descriptions={task.descriptions ?? []}
              description={task.description}
              updateParameterValueInList={(paramId, newValue) => {
                updateParameterValueInList(task.uniqueId, paramId, newValue);
              }}
              updateTaskOrSubTaskProps={(scope_reference, propsValue) =>
                updateTaskOrSubTaskProps(
                  task.uniqueId,
                  scope_reference,
                  propsValue
                )
              }
              conditions={task?.conditionsData?.conditions}
              logicalOperators={task?.conditionsData?.logicalOperators}
              scope_reference={task?.scope_reference}
            />
            <div className="flex row gap-5px">
              <div
                className="full-height flex padding-5px radius-5px pointer"
                style={{ backgroundColor: task.color, aspectRatio: '1 / 1' }}
              >
                <Icons.Code width="16px" height="16px" />
              </div>
              <div
                className="full-height flex col radius-5px"
                style={{ gap: '2px' }}
              >
                <div
                  className="height-50per flex col pointer"
                  style={{
                    backgroundColor: task.color,
                    borderEndEndRadius: '5px',
                    borderEndStartRadius: '5px',
                    padding: '2px 5px',
                    rotate: '180deg',
                  }}
                >
                  <Icons.Expand width="16px" height="8px" color="#fff" />
                </div>
                <div
                  className="height-50per flex col pointer"
                  style={{
                    backgroundColor: task.color,
                    borderEndEndRadius: '5px',
                    borderEndStartRadius: '5px',
                    padding: '2px 5px',
                  }}
                >
                  <Icons.Expand width="16px" height="8px" color="#fff" />
                </div>
              </div>
              <div
                className="full-height flex padding-5px radius-5px pointer"
                style={{
                  backgroundColor: Const.Color.LIGHT_ERROR,
                  aspectRatio: '1 / 1',
                }}
                onClick={() => onDelete(task.uniqueId)}
              >
                <img src={Const.ImageSrc.bin} width="16px" height="16px" />
              </div>
            </div>
          </div>
        </Action>

        {/* Scope params với drop zones */}
        <div
          className="flex col full-width gap-5px"
          style={{ paddingLeft: '58.4px' }}
        >
          {scopeParams.map((scopeParam) => (
            <div key={scopeParam.id} className="flex col gap-5px">
              <div
                className="padding-10px full-width"
                style={{ color: 'white', backgroundColor: `${task.color}99` }}
              >
                {scopeParam.name.toUpperCase()}
              </div>
              <ScopeTaskContainer
                task={task}
                scopeParam={scopeParam}
                activeId={activeId}
                onDeleteSubTask={onDeleteSubTask}
                updateSubTaskParameterValueInList={
                  updateSubTaskParameterValueInList
                }
                updateTaskOrSubTaskProps={updateTaskOrSubTaskProps}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MissionTemplate = ({ icon, name, color }) => {
  return (
    <Action icon={icon} color={color}>
      <span className="padding-10px" style={{ whiteSpace: 'nowrap' }}>
        {name}
      </span>
    </Action>
  );
};

const Action = ({
  icon,
  color,
  actionStyle,
  iconColor = {
    mainColor: '#ffffff66',
    subColor: '#ffffff',
    overlayColor: null,
  },
  iconContainerStyle,
  children,
}) => {
  return (
    <div
      className="flex row radius-5px align-center "
      style={{ backgroundColor: 'white', ...actionStyle }}
    >
      <div
        className="center padding-10px"
        style={{
          backgroundColor: color,
          borderTopLeftRadius: '5px',
          borderBottomLeftRadius: '5px',
          height: '100%',
          aspectRatio: '1 / 1',
        }}
      >
        <div className="center" style={{ ...iconContainerStyle }}>
          {React.isValidElement(icon)
            ? cloneElement(icon, { ...iconColor })
            : icon}
        </div>
      </div>
      {children}
    </div>
  );
};

const DraggableTask = ({ action, categoryColor }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `palette-${action.action_type}`,
    data: {
      type: 'palette-action',
      action: action,
    },
  });

  const [isHovered, setIsHovered] = useState(false);

  const style = {
    cursor: 'move',
    backgroundColor: isHovered ? `${categoryColor}ff` : `${categoryColor}CC`,
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="palette-task flex padding-10px row radius-5px width-fit-content"
      data-action-type={action.action_type}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex align-center">
        <div className="flex row">
          <div className="palette-task-name" style={{ color: 'white' }}>
            {action.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export function MissionEdit() {
  const { guid } = useParams();
  const [activeId, setActiveId] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [actions, setActions] = useState([]);
  const [taskCounter, setTaskCounter] = useState(0);

  useEffect(() => {
    if (selectedTasks.length > 0) {
      const tasksWithPriorities = mUtils.calculateTaskPriorities(selectedTasks);

      // Chỉ cập nhật state nếu priority thực sự thay đổi
      const needsUpdate = tasksWithPriorities.some(
        (task, index) => task.priority !== selectedTasks[index]?.priority
      );

      if (needsUpdate) {
        setSelectedTasks(tasksWithPriorities);
      }
    }
  }, [selectedTasks.length, selectedTasks.map((t) => t.uniqueId).join(',')]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getActiveTask = () => {
    if (!activeId) return null;

    if (activeId.toString().startsWith('palette-')) {
      const actionType = activeId.toString().replace('palette-', '');

      // Tìm kiếm trong tất cả các actions
      for (const actionGroup of actions) {
        const action = actionGroup.actions.find(
          (a) => a.action_type === actionType
        );
        if (action) return action;
      }
    } else {
      return selectedTasks.find((task) => task.uniqueId === activeId);
    }
    return null;
  };

  // Cập nhật allItems để sử dụng actions
  const allItems = useMemo(() => {
    return [
      ...actions.flatMap((actionGroup) =>
        actionGroup.actions.map((action) => `palette-${action.action_type}`)
      ),
      ...selectedTasks.map((task) => task.uniqueId),
      // Thêm drop zones cho workspace
      ...selectedTasks.flatMap((task) => [
        `before-${task.uniqueId}`, // Drop zone trước task
        `after-${task.uniqueId}`, // Drop zone sau task
      ]),
      // Thêm các scope container IDs và drop zones
      ...selectedTasks.flatMap((task) => {
        const scopeParams = mUtils.getScopeParams(task);
        return scopeParams.flatMap((scopeParam) => {
          const baseId = `scope-${task.uniqueId}-${scopeParam.id}`;
          const subtaskCount = task?.subTaskCount || 0;

          const dropZones = [baseId];

          for (let i = 0; i < subtaskCount; i++) {
            dropZones.push(`${baseId}-before-${i}`);
          }

          if (subtaskCount > 0) {
            dropZones.push(`${baseId}-end`);
          }

          return dropZones;
        });
      }),
      'workspace-dropzone',
    ];
  }, [actions, selectedTasks]);

  // Cập nhật handleDragEnd để làm việc với actions
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const activeId = active.id?.toString?.();
    const overId = over.id?.toString?.();
    const isFromPalette = activeId.startsWith('palette-');

    // ====================
    // 1. Thêm vào vùng scope con
    // ====================
    if (isFromPalette && overId.startsWith('scope-')) {
      const actionType = activeId.replace('palette-', '');

      let foundAction = null;
      for (const actionGroup of actions) {
        if (!Array.isArray(actionGroup.actions)) continue;
        foundAction = actionGroup.actions.find(
          (a) => a.action_type === actionType
        );
        if (foundAction) break;
      }

      if (!foundAction) {
        console.warn('Không tìm thấy action với action_type:', actionType);
        setActiveId(null);
        return;
      }

      // Parse overId để lấy thông tin về vị trí thả
      let parentId,
        scopeId,
        insertIndex = -1;

      if (overId.includes('-before-')) {
        const match = overId.match(/^scope-(.+)-(.+)-before-(\d+)$/);
        if (match) {
          parentId = match[1];
          scopeId = match[2];
          insertIndex = parseInt(match[3]);
        }
      } else if (overId.includes('-end')) {
        const match = overId.match(/^scope-(.+)-(.+)-end$/);
        if (match) {
          parentId = match[1];
          scopeId = match[2];
          insertIndex = -1;
        }
      } else {
        const match = overId.match(/^scope-(.+)-(.+)$/);
        if (match) {
          parentId = match[1];
          scopeId = match[2];
          insertIndex = -1;
        }
      }

      if (!parentId || !scopeId) {
        console.warn(
          'Không xác định được parent task và scopeParam từ overId:',
          overId
        );
        setActiveId(null);
        return;
      }

      const newTask = {
        ...foundAction,
        uniqueId: `${foundAction.action_type}_${taskCounter}`,
        priority: 1, // Sẽ được tính lại tự động
        parameters:
          foundAction.parameters?.map((item) => ({
            ...item,
            value: item.constraints.default,
            guid: crypto.randomUUID(),
          })) || [],
        color: foundAction.color,
        icon: foundAction.icon,
        scope_reference: mUtils.getParamGuid(selectedTasks, parentId, scopeId),
        status: 1,
      };

       setSelectedTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) => {
          if (task.uniqueId !== parentId) return task;

          const prevSubtasks = task.subtasks?.[scopeId] || [];
          let newSubtasks;

          if (insertIndex >= 0 && insertIndex < prevSubtasks.length) {
            newSubtasks = [
              ...prevSubtasks.slice(0, insertIndex),
              newTask,
              ...prevSubtasks.slice(insertIndex),
            ];
          } else {
            newSubtasks = [...prevSubtasks, newTask];
          }

          return {
            ...task,
            subtasks: {
              ...task.subtasks,
              [scopeId]: newSubtasks,
            },
          };
        });

        // Tính lại priority sau khi thêm task
        return mUtils.calculateTaskPriorities(updatedTasks);
      });

      setTaskCounter((prev) => prev + 1);
      setActiveId(null);
      return;
    }

    // ====================
    // 2. Thêm vào workspace
    // ====================
    if (isFromPalette) {
      const actionType = activeId.replace('palette-', '');

      let foundAction = null;
      for (const actionGroup of actions) {
        if (!Array.isArray(actionGroup.actions)) continue;
        foundAction = actionGroup.actions.find(
          (a) => a.action_type === actionType
        );
        if (foundAction) break;
      }

      if (!foundAction) {
        console.warn('Không tìm thấy action với action_type:', actionType);
        setActiveId(null);
        return;
      }

      const newTask = {
        ...foundAction,
        uniqueId: `${foundAction.action_type}_${taskCounter}`,
        priority: 1, // Sẽ được tính lại tự động
        parameters:
          foundAction.parameters?.map((item) => ({
            ...item,
            value: item.constraints.default,
            guid: crypto.randomUUID(),
          })) || [],
        color: foundAction.color,
        icon: foundAction.icon,
        status: 1,
        scope_reference: null,
      };

      let updatedTasks;

      if (overId === 'workspace-dropzone') {
        updatedTasks = [...selectedTasks, newTask];
      } else if (overId.startsWith('before-')) {
        const targetTaskId = overId.replace('before-', '');
        const overIndex = selectedTasks.findIndex(
          (task) => task.uniqueId === targetTaskId
        );
        if (overIndex >= 0) {
          const newTasks = [...selectedTasks];
          newTasks.splice(overIndex, 0, newTask);
          updatedTasks = newTasks;
        } else {
          updatedTasks = [...selectedTasks, newTask];
        }
      } else if (overId.startsWith('after-')) {
        const targetTaskId = overId.replace('after-', '');
        const overIndex = selectedTasks.findIndex(
          (task) => task.uniqueId === targetTaskId
        );
        if (overIndex >= 0) {
          const newTasks = [...selectedTasks];
          newTasks.splice(overIndex + 1, 0, newTask);
          updatedTasks = newTasks;
        } else {
          updatedTasks = [...selectedTasks, newTask];
        }
      } else {
        const overIndex = selectedTasks.findIndex(
          (task) => task.uniqueId === overId
        );
        if (overIndex >= 0) {
          const newTasks = [...selectedTasks];
          newTasks.splice(overIndex + 1, 0, newTask);
          updatedTasks = newTasks;
        } else {
          updatedTasks = [...selectedTasks, newTask];
        }
      }

      // Tính lại priority sau khi thêm task
      setSelectedTasks(mUtils.calculateTaskPriorities(updatedTasks));
      setTaskCounter((prev) => prev + 1);
    }

    // ====================
    // 3. Di chuyển trong workspace
    // ====================
    else if (
      !activeId.startsWith('palette-') &&
      !overId.startsWith('palette-')
    ) {
      if (activeId !== overId) {
        setSelectedTasks((tasks) => {
          const oldIndex = tasks.findIndex((t) => t.uniqueId === activeId);
          const newIndex = tasks.findIndex((t) => t.uniqueId === overId);

          if (oldIndex !== -1 && newIndex !== -1) {
            const reorderedTasks = arrayMove(tasks, oldIndex, newIndex);
            // Tính lại priority sau khi di chuyển
            return mUtils.calculateTaskPriorities(reorderedTasks);
          }
          return tasks;
        });
      }
    }

    setActiveId(null);
  };

  const handleDragStart = (event) => {
    console.log('Drag started:', event.active.id); // Thêm log này
    setActiveId(event.active.id);
  };

  const deleteTask = (uniqueId) => {
    setSelectedTasks((prevTasks) => {
      const filteredTasks = prevTasks.filter(
        (task) => task.uniqueId !== uniqueId
      );
      return mUtils.calculateTaskPriorities(filteredTasks);
    });
  };

  const logAllPriorities = () => {
    const allTasks = mUtils.getAllTasksFlattened(selectedTasks);
    console.log('=== ALL TASKS WITH PRIORITIES ===');
    allTasks.forEach((task) => {
      console.log(
        `Priority ${task.priority}: ${task.name} (${task.uniqueId}) - scope_reference: ${task.scope_reference || 'null'}`
      );
    });
    console.log('================================');
  };

  const addTask = (task) => {
    const newTask = {
      ...task,
      uniqueId: `${task.id}_${taskCounter}`,
      params: task.params ? [...task.params] : [],
      scope_reference: null, // Task bình thường không có scope_reference
    };
    setSelectedTasks([...selectedTasks, newTask]);
    setTaskCounter(taskCounter + 1);
  };

  const executeProgram = () => {
    // Log priorities trước khi xử lý
    logAllPriorities();

    // Bước 1: Xử lý điều kiện phức tạp và tách thành các block đơn
    const processedTasks =
      mUtils.ConditionUtils.processComplexConditions(selectedTasks);
    console.log('Tasks after splitting complex conditions:', processedTasks);

    // Bước 3: Tính toán lại priority
    const tasksWithPriority = mUtils.calculateTaskPriorities(processedTasks);

    // Bước 2: Flatten tất cả tasks (bao gồm subtasks)
    const allTasksFlattened = mUtils.getAllTasksFlattened(tasksWithPriority);

    // Bước 4: Sắp xếp theo priority
    const sortedTasks = allTasksFlattened.sort(
      (a, b) => a.priority - b.priority
    );

    console.log('Final tasks to save:', sortedTasks);

    // Bước 5: Thực hiện lưu
    exe1('374052c7-38a4-11f0-b4c9-000129af8ea5', sortedTasks);
  };

  const clearProgram = () => {
    setSelectedTasks([]);
    setTaskCounter(0);
  };

  const defaultStyle = {
    icon: <Icons.Move />, // icon mặc định bạn tạo hoặc null
    color: '#999999',
  };

  async function fetchRegisters() {
    try {
        const { data } = await api.getRegisters();
        return data.map((register) => ({
          name: register.label == '' ? register.id : register.label,
          value: register.id,
          realValue: register.value,
        }))
      } catch (error) {
        console.error('Lỗi khi fetch registers');
      }
  }

  useEffect(() => {
    async function fetchActions() {
      try {
        const { data: missionGroupIds } = await api.getMissionGroups();
        const constMissionGroups =
          utils.filterMirconstMissionGroups(missionGroupIds);

        const results = [];

        for (const missionGroup of constMissionGroups) {
          try {
            const { data: actions } = await api.getMission_groupsActions(
              missionGroup.guid
            );
            // Lấy id và style
            const id = utils.getMissionGroupIdFromGuid(missionGroup.guid);
            const style =
              id && Const.MissionGroupStyles[id]
                ? Const.MissionGroupStyles[id]
                : defaultStyle;

            // Lấy chi tiết action cho từng action
            const actionsWithDetails = await Promise.all(
              actions.map(async (action) => {
                try {
                  const { data: detail } = await api.getAction(
                    action.action_type
                  );
                  return {
                    action: {
                      ...action,
                      style,
                    },
                    detail,
                  };
                } catch (err) {
                  console.warn(
                    `Không lấy được detail cho action_type ${action.action_type}`
                  );
                  return {
                    action: {
                      ...action,
                      style,
                    },
                    detail: null,
                  }; // fallback
                }
              })
            );

            results.push({
              missionGroup: {
                ...missionGroup,
                style,
              },
              actions: actionsWithDetails,
            });
          } catch (err) {
            console.error(`Lỗi khi lấy actions của ${missionGroup.name}`);
          }
        }

        const registerChoices = await fetchRegisters();

        const allActions = results.flatMap((group) => {
          if (!Array.isArray(group.actions)) return [];

          return convertMissionGroupFromApi(group.missionGroup, group.actions, { registerChoices });
        });

        setActions(allActions);

        const createdActions = await fetchMissionActions(guid, allActions);
        // const sortedActions = createdActions.sort(
        //   (a, b) => a.priority - b.priority
        // );
        setSelectedTasks(createdActions);
      } catch (error) {
        console.error('Lỗi khi fetch mission groups:');
      }
    }

    // fetchActions();

    const allActions = Const.TestActions.flatMap((group) => {
      if (!Array.isArray(group.actions)) return [];

      return convertMissionGroupFromApi(group.missionGroup, group.actions, { registerChoices: Const.TestRegisterChoices });
    });

    setActions(allActions)

    fetchMissionActions(null, allActions)
      .then((createdActions) => {
        // const sortedActions = createdActions.sort(
        //   (a, b) => a.priority - b.priority
        // );
        console.log(createdActions);
        setSelectedTasks(createdActions);
      })
      .catch((error) => {
        console.error('Lỗi khi fetch mission actions:', error);
      });

  }, []);

  const exe1 = async (mission_id, tasksToSave = null) => {
    try {
      const tasksData =
        tasksToSave || mUtils.getAllTasksFlattened(selectedTasks);

      const actionData = tasksData.map((task) => {
        const params = task.parameters.map((param) => {
          let valueToSend = param.value;
          const isNullable = param.constraints.nullable ?? false;

          if (
            isNullable &&
            (valueToSend === undefined ||
              valueToSend === null ||
              valueToSend === '')
          ) {
            if (param.default !== undefined) {
              valueToSend = param.default;
            } else {
              alert(`Tham số "${param.name}" không được để trống`);
              throw new Error(`Tham số "${param.name}" không được để trống`);
            }
          }

          return {
            id: param.id,
            type: param.type,
            value: valueToSend,
            nullable: isNullable,
            default: param.default ?? null,
            min: param.min ?? null,
            max: param.max ?? null,
          };
        });

        return {
          status: task.status,
          data: {
            action_type: task.action_type,
            mission_id: mission_id,
            parameters: params,
            priority: task.priority, // Sử dụng priority đã tính toán
            guid: task?.guid,
            status: task.status,
          },
        };
      });

      actionData.forEach(async (action) => {
        switch (action.status) {
          case 0:
            console.log('Updating action:', action.data);
            putMissionAction(mission_id, action.data.guid, action.data);
            break;

          case 1:
            console.log('Creating action:', action.data);
            postMissionAction(mission_id, action.data);
            break;

          case 2:
            deleteMissionAction(mission_id, action.data.guid);
            break;
        }
      });

      alert('Lưu nhiệm vụ thành công!');
    } catch (error) {
      console.error('Lỗi khi lưu nhiệm vụ:');
      alert('Lưu nhiệm vụ thất bại, vui lòng thử lại.');
    }
  };

  useEffect(() => {
    console.log(actions)
    //
    // api.postMissionsAction("374052c7-38a4-11f0-b4c9-000129af8ea5", {
    //   "action_type": "move",
    //   "mission_id": "374052c7-38a4-11f0-b4c9-000129af8ea5",
    //   "parameters": [
    //     {
    //       "id": "position",
    //       "type": "Reference",
    //       "value": "fea2fe00-7c5c-11ed-8c6e-000129af8ea5",
    //       "nullable": false
    //     },
    //     {
    //       "id": "cart_entry_position",
    //       "type": "Selection",
    //       "value": "main",
    //       "nullable": false,
    //       "default": "main"
    //     },
    //     {
    //       "id": "main_or_entry_position",
    //       "type": "Selection",
    //       "value": "main",
    //       "nullable": false,
    //       "default": "main"
    //     },
    //     {
    //       "id": "marker_entry_position",
    //       "type": "Selection",
    //       "value": "entry",
    //       "nullable": false,
    //       "default": "entry"
    //     },
    //     {
    //       "id": "retries",
    //       "type": "Integer",
    //       "value": 10,
    //       "nullable": false,
    //       "default": 10,
    //       "min": 0,
    //       "max": 1000
    //     },
    //     {
    //       "id": "distance_threshold",
    //       "type": "Float",
    //       "value": 0.1,
    //       "nullable": false,
    //       "default": 0.1,
    //       "min": 0.1,
    //       "max": 3
    //     }
    //   ],
    //   "priority": 1
    // });
    // api.getMission_definition("374052c7-38a4-11f0-b4c9-000129af8ea5");
    // api.getMissionId("374052c7-38a4-11f0-b4c9-000129af8ea5");
  }, [actions]);

  useEffect(() => {
    console.log(selectedTasks);
  }, [selectedTasks]);

  return (
    <div className="content flex row full-height">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <TaskPalette actions={actions}/>
        <SortableContext
          items={allItems}
          strategy={verticalListSortingStrategy}
        >
          <div
            className="main-workspace flex col gap-frame full-width"
            style={{
              flex: 1,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div className="mission-template flex col gap-10px full-width">
              <div className="mission-template-title flex row align-center gap-10px">
                <Icons.Sparkle />
                <h2>Mission templates</h2>
              </div>
              <div
                className="mission-template-list flex row gap-10px"
                style={{
                  overflowX: 'auto',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                <MissionTemplate
                  icon={
                    <Icons.BatteryCharging
                      mainColor="#ffffff66"
                      subColor="#ffffff"
                    />
                  }
                  name="Auto recharge"
                  color="#2A7378"
                />
                <MissionTemplate
                  icon={
                    <Icons.Logic mainColor="#ffffff66" subColor="#ffffff" />
                  }
                  name="Repetitive Pickup and Delivery"
                  color="#9333EA"
                />
                <MissionTemplate
                  icon={
                    <Icons.BatteryCharging
                      mainColor="#ffffff66"
                      subColor="#ffffff"
                    />
                  }
                  name="Auto recharge"
                  color="#2A7378"
                />
                <MissionTemplate
                  icon={
                    <Icons.Logic mainColor="#ffffff66" subColor="#ffffff" />
                  }
                  name="Repetitive Pickup and Delivery"
                  color="#9333EA"
                />
                <MissionTemplate
                  icon={
                    <Icons.BatteryCharging
                      mainColor="#ffffff66"
                      subColor="#ffffff"
                    />
                  }
                  name="Auto recharge"
                  color="#2A7378"
                />
                <MissionTemplate
                  icon={
                    <Icons.Logic mainColor="#ffffff66" subColor="#ffffff" />
                  }
                  name="Repetitive Pickup and Delivery"
                  color="#9333EA"
                />
                <MissionTemplate
                  icon={
                    <Icons.BatteryCharging
                      mainColor="#ffffff66"
                      subColor="#ffffff"
                    />
                  }
                  name="Auto recharge"
                  color="#2A7378"
                />
                <MissionTemplate
                  icon={
                    <Icons.Logic mainColor="#ffffff66" subColor="#ffffff" />
                  }
                  name="Repetitive Pickup and Delivery"
                  color="#9333EA"
                />
              </div>
            </div>

            <div
              className="task-workspace flex col full-width gap-10px full-height"
              style={{ flex: '1', overflow: 'hidden' }}
            >
              <div className="mission-template flex row space-between">
                <div className="mission-template-title flex row align-center gap-10px">
                  <Icons.Board />
                  <h2>Mission board</h2>
                </div>
                <div className="workspace-controls">
                  <button
                    className="control-btn execute-btn flex row align-center gap-5px"
                    onClick={executeProgram}
                  >
                    <img className="size-20px" src={Const.ImageSrc.save}></img>
                    Save
                  </button>
                  <button
                    className="control-btn clear-btn flex row align-center gap-5px"
                    onClick={clearProgram}
                  >
                    <img className="size-20px" src={Const.ImageSrc.bin}></img>
                    Clear all
                  </button>
                </div>
              </div>

              <WorkspaceDropZone activeId={activeId}>
                <div
                  className="flex col"
                  style={{ height: 'fit-content', gap: '15px' }}
                >
                  {selectedTasks.length === 0 ? (
                    <div
                      className="empty-workspace"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        color: '#6b7280',
                        fontSize: '16px',
                        textAlign: 'center',
                        padding: '40px 20px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                          alignItems: 'center',
                        }}
                      >
                        <Icons.Board color="#9ca3af" />
                        Drag tasks from the palette to build your program
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Drop zone đầu tiên */}
                      {activeId &&
                        activeId.toString().startsWith('palette-') && (
                          <DropZone
                            id={`before-${selectedTasks[0].uniqueId}`}
                            isActive={true}
                            style={{ minHeight: '12px', margin: '4px 0' }}
                          />
                        )}
                      {selectedTasks.map((task) => (
                        <SortableTask
                          key={task.uniqueId}
                          task={task}
                          isActive={activeId === task.uniqueId}
                          onDelete={deleteTask}
                          activeId={activeId} // Thêm dòng này để truyền activeId
                          updateParameterValueInList={(
                            uniqueId,
                            paramId,
                            newValue
                          ) => {
                            const newSelectedTasks =
                              mUtils.updateParameterValueInList(
                                selectedTasks,
                                uniqueId,
                                paramId,
                                newValue
                              );
                            setSelectedTasks(newSelectedTasks);
                          }}
                          onDeleteSubTask={(parentId, subTaskId, scopeId) => {
                            setSelectedTasks((prev) =>
                              prev.map((task) => {
                                if (task.uniqueId !== parentId) return task;
                                return {
                                  ...task,
                                  subtasks: {
                                    ...task.subtasks,
                                    [scopeId]: task.subtasks?.[scopeId]?.filter(
                                      (t) => t.uniqueId !== subTaskId
                                    ),
                                  },
                                };
                              })
                            );
                          }}
                          updateSubTaskParameterValueInList={(
                            uniqueId,
                            subTaskUniqueId,
                            scopeParamId,
                            paramId,
                            newValue
                          ) => {
                            const newSelectedTasks =
                              mUtils.updateSubTaskParameterValueInList(
                                selectedTasks,
                                uniqueId,
                                subTaskUniqueId,
                                scopeParamId,
                                paramId,
                                newValue
                              );
                            setSelectedTasks(newSelectedTasks);
                          }}
                          updateTaskOrSubTaskProps={(
                            taskId,
                            scope_reference,
                            propsValue
                          ) => {
                            const newSelectedTasks =
                              mUtils.updateTaskOrSubTaskProps(
                                selectedTasks,
                                taskId,
                                scope_reference,
                                propsValue
                              );

                            setSelectedTasks(newSelectedTasks);
                          }}
                        />
                      ))}
                    </>
                  )}
                </div>
              </WorkspaceDropZone>
            </div>
          </div>
        </SortableContext>

        <DragOverlay>
          {activeId ? (
            <SortableTask
              task={getActiveTask()}
              isActive={true}
              onDelete={() => {}}
              activeId={activeId} // Thêm activeId cho DragOverlay
              updateParameterValueInList={() => {}} // Thêm prop bắt buộc
              onDeleteSubTask={() => {}}
              updateSubTaskParameterValueInList={() => {}}
              updateTaskOrSubTaskProps={() => {}}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

const TaskPalette = ({ actions }) => {
  const [searchValue, setSearchValue] = useState('');
  const [ displayActions, setDisplayActions] = useState(actions);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    const trimmedValue = value.trim();

    if (trimmedValue) {
      const searchResult = mUtils.advancedSearchActions(actions, {
        searchTerm: trimmedValue,
        searchType: 'both',
        exactMatch: false,
        limit: null
      });
      setDisplayActions(searchResult.results);
    } else {
      // Nếu không nhập gì thì hiện tất cả
      setDisplayActions(actions);
    }
  };

  useEffect(() => {
    setDisplayActions(actions);
  }, [actions])

  return (
    <section className="width-30per">
      <div className="flex row align-center gap-10px">
        <Icons.ActionsList width="20px" height="20px" />
        <h2>Actions</h2>
      </div>
      <div className="flex row align-center gap-10px">
        <div className="relative-pos full-height full-width">
          <input
            type="text"
            className="full-height"
            placeholder="Search by name..."
            value={searchValue}
            onChange={handleSearchChange}
          />
          <button
            className="absolute-pos center"
            style={{
              right: 10,
              backgroundColor: 'transparent',
              top: '50%',
              transform: 'translate(0, -50%)',
            }}
          >
            <Icons.Search
              width="20px"
              height="20px"
              color={Const.Color.BUTTON}
            />
          </button>
        </div>
        <button className="button">
          <Icons.Filter />
        </button>
      </div>

      <div style={{ overflowY: 'auto', height: '100%' }}>
        {displayActions.map((missionGroup, index) => (
          <CategoryDropdown
            key={missionGroup.guid || index}
            actionGroup={missionGroup}
          />
        ))}
      </div>
    </section>
  );
};

const CategoryDropdown = ({ actionGroup }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isHover, setIsHover] = useState(false);

  const actions = actionGroup.actions;
  const categoryColor = actionGroup.color;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const headerStyle = {
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backgroundColor: isHover ? `${categoryColor}33` : `${categoryColor}1A`,
  };

  const chevronStyle = {
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
    color: '#6b7280',
  };

  const contentStyle = {
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    maxHeight: isExpanded ? '1000px' : '0px',
  };

  const innerContentStyle = {
    padding: '8px 8px 4px 8px',
    transform: isExpanded ? 'translateY(0)' : 'translateY(-16px)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      {/* Header with smooth hover and click animations */}
      <div
        className="category-section flex align-center radius-5px gap-10px padding-15px"
        style={headerStyle}
        onClick={toggleExpanded}
        onMouseEnter={(e) => {
          setIsHover(true);
        }}
        onMouseLeave={(e) => {
          setIsHover(false);
        }}
        onMouseDown={(e) => {
          e.target.style.transition = 'none';
        }}
        onMouseUp={(e) => {
          e.target.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        }}
      >
        {/* Icon */}
        <div
          style={{ transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
          {actionGroup.icon}
        </div>

        {/* Title */}
        <h4 className="full-width" style={{ color: categoryColor }}>
          {actionGroup.name}
        </h4>

        {/* Chevron with smooth rotation */}
        <div style={chevronStyle}>
          <Icons.Expand height="20px" width="20px" color={categoryColor} />
        </div>
      </div>

      {/* Expandable content with smooth slide animation */}
      <div style={contentStyle}>
        <div style={innerContentStyle}>
          <div className="flex flex-wrap gap-5px">
            {/* Staggered animation for actions */}
            {actions.map((action, index) => (
              <TaskItem
                key={action.action_type}
                action={action}
                categoryColor={categoryColor}
                index={index}
                isExpanded={isExpanded}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Task item with staggered animation (updated for actions)
const TaskItem = ({ action, categoryColor, index, isExpanded }) => {
  const taskStyle = {
    transform: isExpanded
      ? 'translateY(0) scale(1)'
      : 'translateY(8px) scale(0.95)',
    transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,
    transitionDelay: isExpanded ? `${index * 50}ms` : '0ms',
  };

  return (
    <div style={taskStyle}>
      <DraggableTask action={action} categoryColor={categoryColor} />
    </div>
  );
};

const fetchMissionAction = async (mission_id, guid) => {
  try {
    const response = await api.GetMissionAction(mission_id, guid);
    return response.data;
  } catch (error) {
    console.warn(`Lỗi khi lấy mission action với guid ${guid}: ${error}`);
    return null; // hoặc throw error nếu muốn xử lý ở nơi gọi
  }
};

function processActionsSubTasks(detailMissionActions) {
  // Bước 1: Lọc ra các action có scope_reference khác null
  const actionsWithScopeRef = [];
  const indicesToRemove = new Set(); // Set để lưu các index cần xóa
  
  detailMissionActions.forEach((action, index) => {
    if (action.scope_reference !== null && action.scope_reference !== undefined) {
      actionsWithScopeRef.push({
        action: action,
        originalIndex: index
      });
      indicesToRemove.add(index); // Đánh dấu index cần xóa
    }
  });
  
  console.log('Actions có scope_reference:', actionsWithScopeRef);
  console.log('Các index sẽ bị xóa:', Array.from(indicesToRemove));
  
  // Bước 2: Xử lý từng action có scope_reference
  actionsWithScopeRef.forEach(({ action: scopedAction, originalIndex }) => {
    const scopeRefGuid = scopedAction.scope_reference;
    
    // Tìm các action có parameter type "Scope" với guid khớp
    detailMissionActions.forEach((parentAction, parentIndex) => {
      if (parentAction.parameters && Array.isArray(parentAction.parameters)) {
        parentAction.parameters.forEach(param => {
          // Kiểm tra param có type "Scope" và guid khớp với scope_reference
          if (param.type === "Scope" && param.guid === scopeRefGuid) {
            // Khởi tạo subtasks nếu chưa có
            if (!parentAction.subtasks) {
              parentAction.subtasks = {};
            }
            
            const keyString = param.id.toString();
            
            // Khởi tạo mảng cho key này nếu chưa có
            if (!parentAction.subtasks[keyString]) {
              parentAction.subtasks[keyString] = [];
            }
            
            // Thêm action vào mảng
            parentAction.subtasks[keyString].push(scopedAction);
            
            console.log(`Đã thêm action (index ${originalIndex}) vào subtasks của action (index ${parentIndex}) với key "${keyString}"`);
          }
        });
      }
    });
  });
  
  // Bước 3: Xóa các action đã được thêm vào subtasks khỏi mảng gốc
  // Sắp xếp các index theo thứ tự giảm dần để xóa từ cuối lên đầu
  const sortedIndicesToRemove = Array.from(indicesToRemove).sort((a, b) => b - a);
  
  console.log('\n=== XÓA ACTIONS KHỎI MẢNG GỐC ===');
  sortedIndicesToRemove.forEach(index => {
    const removedAction = detailMissionActions.splice(index, 1)[0];
    console.log(`Đã xóa action tại index ${index}: ${removedAction.name} (guid: ${removedAction.guid})`);
  });
  
  return detailMissionActions;
}

function processActionsConditions(actions) {
  return actions.map((action) => {
    const {parameters, description, descriptions} = action; 
    let applicableDesc = {text: description } || descriptions[0] || null;
    
    if(!applicableDesc) return {
      ...action,
      conditionsData: {
        conditions: [],
        logicalOperators: []
      }
    }
    
    // Bước 2: Dùng hàm getParameters để lấy danh sách param
    const params = mUtils.initConditions(parameters, description, descriptions);
    console.log(params)
    // Bước 3: Tạo condition mới
    const newCondition = {
      id: 1, // ID là index tiếp theo
      values: params // Values là mảng các param
    };
    
    return {
      ...action,
      conditionsData: {
        conditions: [newCondition],
        logicalOperators: [],
      },
    };
  })
}

//lấy ra danh sách action
const fetchMissionActions = async (mission_id, actions) => {
  //Lấy ra danh sách mission actions có sẵn
 try {
  //!!!
  // const { data: missionActions } = await api.GetMissionActions(mission_id);

  // const detailMissionActions = await Promise.all(
  //       missionActions.map(async (action) => {
  //         const detail = await fetchMissionAction(mission_id, action.guid);
  //         return detail;
  //       })
  //     );

  //Test
  const detailMissionActions = Const.existedDetailAction;
  console.log(detailMissionActions)
  //

  const allActions = mUtils.getAllActionDefinitions(actions);
  
  const createdAction = detailMissionActions
    .map((action) => {
      const actionType = allActions.find(
        (type) => type.action_type === action.action_type
      );
      
      if (!actionType) return null;

      return {
        ...action,
        uniqueId: `${action.action_type}_${action.priority}`,
        guid: action.guid,
        parameters: mUtils.enhanceParameters(
          actionType.parameters,
          action.parameters,
        ),
        description: action.description,
        descriptions: actionType.descriptions,
        name: actionType.name,
        color: actionType.color,
        icon: actionType.icon,
        status: 0,
      };
    })
    .filter(Boolean); // Loại bỏ các phần tử null nếu không tìm thấy actionType

    const actionsWithConditions = processActionsConditions(createdAction);
    console.log(actionsWithConditions)
    const actionsWithSubTasks = processActionsSubTasks(actionsWithConditions);
  return actionsWithSubTasks;
} catch (err) {
  console.warn(`Không lấy được detail cho mission_id ${mission_id}: ${err} `);
}

};

//Xóa action
const deleteMissionAction = async (mission_id, guid) => {
  //Lấy ra danh sách mission actions có sẵn
  try {
    const { statusCode } = await api.deleteMissionAction(mission_id, guid);
    return statusCode;
  } catch (err) {
    console.warn(`Không lấy được detail cho mission_id ${mission_id}`);
  }
};

//cập nhật action
const putMissionAction = async (mission_id, guid, action) => {
  //Lấy ra danh sách mission actions có sẵn
  try {
    const { data, statusCode } = await api.putMissionAction(mission_id, guid, {
      parameters: action.parameters,
      priority: action.priority,
      scope_reference: action?.scope_reference,
    });
    return data;
  } catch (err) {
    console.warn(`Không lấy được detail cho mission_id ${mission_id}`);
  }
};

//thêm ms action
const postMissionAction = async (mission_id, action) => {
  //Lấy ra danh sách mission actions có sẵn
  try {
    const { data, statusCode } = await api.postMissionsAction(mission_id, {
      action_type: action.action_type,
      mission_id: action.mission_id,
      parameters: action.parameters,
      priority: action.priority,
      scope_reference: action?.scope_reference,
      guid: action?.guid,
    });
    return data;
  } catch (err) {
    console.warn(`Không lấy được detail cho mission_id ${mission_id}`);
  }
};
