<?php

namespace App\Http\Controllers;

use App\Models\SmtpSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class SettingController extends Controller
{
    public function index()
    {
        return Inertia::render("Settings/index");
    }




    public function smtpIndex()
    {
        $smtp = SmtpSetting::first();
        return Inertia::render("Settings/Smtp/index", compact("smtp"));
    }

    public function smtpSave(Request $request)
    {
        $validated_req = $request->validate([
            'mailer' => "required|string",
            'scheme' => "required|string",
            'host' => "required|string",
            'port' => "required|numeric",
            'username' => "required|string|email",
            'password' => "required|string",
            'from_address' => "required|string|email",
            'from_name' => "required|string",
        ]);

        $smtp = SmtpSetting::first();
        if (!empty($smtp)) {
            $smtp->update($validated_req);
        } else {
            SmtpSetting::create($validated_req);
        }

        return back()->with("success", "SMTP Settings Saved Successfully");
    }




    public function roleIndex()
    {

        $roles = Role::latest()->paginate(5);

        $roles->getCollection()->transform(function ($role) {
            $role->added_at = $role->created_at->diffForHumans();

            return $role;
        });

        return Inertia::render("Settings/RolePermission/Role/index", compact("roles"));
    }

    public function roleCreate()
    {
        return Inertia::render("Settings/RolePermission/Role/create");
    }


    public function roleStore(Request $request)
    {
        $validated_req = $request->validate([
            "name" => "required|string|max:20"
        ]);

        $role = Role::updateOrCreate(
            [
                "name" => $validated_req["name"]
            ],
            $validated_req
        );

        if ($role) {
            return redirect()->route("settings.role.index")->with("success", "Role Created Successfully");
        } else {
            return back()->with("error", "Something went wrong");
        }
    }

    public function roleEdit(string $id)
    {
        if (empty($id) || $id == 1) {
            return back()->with("error", "Something went wrong");
        }

        $role = Role::find($id);

        if (empty($role)) {
            return back()->with("error", "Something went wrong");
        }


        return Inertia::render("Settings/RolePermission/Role/edit", compact("role"));
    }


    public function roleUpdate(Request $request, $id)
    {
        if (empty($id) || $id == 1) {
            return back()->with("error", "Something went wrong");
        }


        $validated_req = $request->validate([
            'name' => "required|string|max:20",
        ]);

        $role = Role::find($id);

        if (empty($role)) {
            return back()->with("error", "Something went wrong");
        }

        if ($role->update($validated_req)) {
            return redirect()->route("settings.role.index")->with("success", "Role Updated Successfully");
        } else {
            return back()->with("error", "Something went wrong While Updating Role");
        }
    }

    public function roleDestroy(string $id)
    {
        if (empty($id)) {
            return back()->with("error", "Something went wrong");
        }

        $role = Role::find($id);

        if (empty($role)) {
            return back()->with("error", "Something went wrong");
        }

        if ($role->delete()) {
            return back()->with("success", "Role Deleted Successfully");
        } else {
            return back()->with("error", "Something went wrong");
        }
    }

    public function roleDeleteBySelection(Request $request)
    {
        $role_ids = $request->role_ids;

        if (count($role_ids) > 0 && !empty($role_ids)) {
            if (Role::destroy($role_ids)) {
                return back()->with("success", "Roles Deleted Successfully");
            } else {
                return back()->with("error", "Something went wrong");
            }
        } else {
            return back()->with("error", "Please select at least one role");
        }
    }



    public function permissionIndex(string $id)
    {
        if (empty($id)) {
            return back()->with("error", "Something went wrong");
        }

        $role = Role::find($id);

        if (empty($role)) {
            return back()->with("error", "Something went wrong");
        }

        $permissions = Permission::all();
        $hasPermissions = $role->permissions->pluck("id")->toArray();


        return Inertia::render("Settings/RolePermission/Permission/index", compact("id", "permissions", "hasPermissions"));
    }

    public function permissionCreate()
    {
        return Inertia::render("Settings/RolePermission/Permission/create");
    }

    public function permissionStore(Request $request)
    {
        $validated_req = $request->validate([
            "name" => "required|string",
            "icon" => "required|string",
            "guard_name" => "web"
        ]);

        $permission = Permission::where("name", $validated_req["name"])->first();
        if (!empty($permission)) {
            $permission->update($validated_req);
        } else {
            Permission::create($validated_req);
        }

        return back()->with("success", "Permission Created Successfully");
    }

    public function permissionAssign(Request $request, string $id)
    {
        if (empty($id)) {
            return back()->with("error", "Something went wrong");
        }

        $role = Role::find($id);

        if (empty($role)) {
            return back()->with("error", "Something went wrong");
        }


        $validated_req = $request->validate([
            "permission_id" => "required|array",
            "permission_id.*" => "required|exists:permissions,id",
            "role_id" => "required|exists:roles,id"
        ], [
            "permission_id.required" => "Please select at least one permission",
            "permission_id.*.required" => "Please select at least one permission",
            "permission_id.*.exists" => "Selected Permission Should be Valid",
            "role_id.required" => "Please select at least one role",
            "role_id.exists" => "Please select at least one role",
        ]);


        if ($role->syncPermissions($validated_req["permission_id"])) {
            return back()->with("success", "Permission Assigned Successfully");
        } else {
            return back()->with("error", "Something went wrong");
        }
    }




    public function subscriptionPlans()
    {


        return Inertia::render("Settings/SubscriptionPlans/index");
    }
}
